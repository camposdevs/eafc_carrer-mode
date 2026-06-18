const axios = require("axios");
const supabase = require("../config/supabase");

const sportmonksApi = axios.create({
  baseURL: "https://api.sportmonks.com/v3/football",
  timeout: 20000
});

sportmonksApi.interceptors.request.use((config) => {
  config.params = {
    ...(config.params || {}),
    api_token: process.env.SPORTMONKS_API_TOKEN
  };

  return config;
});

function calculateAge(dateOfBirth) {
  if (!dateOfBirth) return null;

  const birthDate = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

function normalizeTeam(team) {
  return {
    sportmonks_id: team.id,
    name: team.name,
    short_name: team.short_code || team.short_name || null,
    logo: team.image_path || null,
    country: team.country?.name || null,
    city: team.venue?.city_name || null,
    stadium: team.venue?.name || null
  };
}

function normalizeSquadPlayer(item) {
  const player = item.player || item;

  return {
    sportmonks_id: player.id,
    name: player.display_name || player.name || player.common_name,
    photo: player.image_path || null,
    nationality: player.nationality?.name || player.country?.name || null,
    age: calculateAge(player.date_of_birth),
    height: player.height || null,
    weight: player.weight || null,
    preferred_foot: null,
    position: item.position?.name || player.position?.name || null,
    overall_initial: null,
    overall_current: null,
    potential: null,
    market_value: null,
    salary: null
  };
}

async function searchTeams(query) {
  const response = await sportmonksApi.get(`/teams/search/${query}`, {
    params: {
      include: "country;venue"
    }
  });

  return response.data.data.map(normalizeTeam);
}

async function getTeamById(teamId) {
  const response = await sportmonksApi.get(`/teams/${teamId}`, {
    params: {
      include: "country;venue"
    }
  });

  return normalizeTeam(response.data.data);
}

async function getTeamSquad(teamId, seasonId) {
  if (seasonId) {
    const response = await sportmonksApi.get(
      `/squads/seasons/${seasonId}/teams/${teamId}`,
      {
        params: {
          include: "player;position"
        }
      }
    );

    return response.data.data.map(normalizeSquadPlayer);
  }

  const teamResponse = await sportmonksApi.get(`/teams/${teamId}`, {
    params: {
      include: "players"
    }
  });

  const players = teamResponse.data.data.players || [];

  return players.map(normalizeSquadPlayer);
}

async function saveTeam(team) {
  const { data: existingTeam } = await supabase
    .from("teams")
    .select("*")
    .eq("sportmonks_id", team.sportmonks_id)
    .maybeSingle();

  if (existingTeam) {
    return existingTeam;
  }

  const { data, error } = await supabase
    .from("teams")
    .insert(team)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
}

async function savePlayer(player) {
  const { data: existingPlayer } = await supabase
    .from("players")
    .select("*")
    .eq("sportmonks_id", player.sportmonks_id)
    .maybeSingle();

  if (existingPlayer) {
    return existingPlayer;
  }

  const { data, error } = await supabase
    .from("players")
    .insert(player)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
}

async function importCareerFromSportmonks(userId, payload) {
  const {
    team_id,
    season_id,
    career_name,
    initial_season = "2025/26"
  } = payload;

  if (!team_id) {
    throw new Error("team_id é obrigatório.");
  }

  const team = await getTeamById(team_id);
  const savedTeam = await saveTeam(team);

  const { data: career, error: careerError } = await supabase
    .from("careers")
    .insert({
      user_id: userId,
      name: career_name || `Carreira ${savedTeam.name}`,
      club_name: savedTeam.name,
      club_logo: savedTeam.logo,
      country: savedTeam.country,
      league: null,
      initial_season: initial_season
    })
    .select("*")
    .single();

  if (careerError) throw new Error(careerError.message);

  const { data: season, error: seasonError } = await supabase
    .from("seasons")
    .insert({
      career_id: career.id,
      season_name: initial_season
    })
    .select("*")
    .single();

  if (seasonError) throw new Error(seasonError.message);

  const squad = await getTeamSquad(team_id, season_id);

  let importedPlayers = 0;

  for (const player of squad) {
    if (!player.name) continue;

    const savedPlayer = await savePlayer(player);

    const { error: careerPlayerError } = await supabase
      .from("career_players")
      .insert({
        career_id: career.id,
        player_id: savedPlayer.id,
        overall: savedPlayer.overall_current,
        market_value: savedPlayer.market_value,
        salary: savedPlayer.salary
      });

    if (!careerPlayerError) {
      importedPlayers++;
    }
  }

  return {
    career,
    season,
    team: savedTeam,
    imported_players: importedPlayers
  };
}

module.exports = {
  searchTeams,
  getTeamById,
  getTeamSquad,
  importCareerFromSportmonks
};