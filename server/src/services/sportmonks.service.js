const axios = require("axios");
const supabase = require("../config/supabase");

const sportmonksApi = axios.create({
  baseURL: "https://api.sportmonks.com/v3/football",
  params: {
    api_token: process.env.SPORTMONKS_API_TOKEN
  }
});

async function searchTeams(query) {
  const response = await sportmonksApi.get("/teams/search/" + query, {
    params: {
      include: "country,venue"
    }
  });

  return response.data.data.map((team) => ({
    sportmonks_id: team.id,
    name: team.name,
    short_name: team.short_code,
    logo: team.image_path,
    country: team.country?.name || null,
    city: team.venue?.city_name || null,
    stadium: team.venue?.name || null
  }));
}

async function getTeamSquad(teamId) {
  const response = await sportmonksApi.get(`/squads/teams/${teamId}`, {
    params: {
      include: "player,nationality,position"
    }
  });

  return response.data.data.map((item) => ({
    sportmonks_id: item.player?.id,
    name: item.player?.display_name || item.player?.name,
    photo: item.player?.image_path || null,
    nationality: item.nationality?.name || null,
    age: item.player?.date_of_birth
      ? new Date().getFullYear() - new Date(item.player.date_of_birth).getFullYear()
      : null,
    height: item.player?.height || null,
    weight: item.player?.weight || null,
    preferred_foot: null,
    position: item.position?.name || null,
    overall_initial: null,
    overall_current: null,
    potential: null,
    market_value: null,
    salary: null
  }));
}

async function importTeamCareer(userId, payload) {
  const { team, career_name, initial_season } = payload;

  const { data: savedTeam, error: teamError } = await supabase
    .from("teams")
    .insert({
      sportmonks_id: team.sportmonks_id,
      name: team.name,
      short_name: team.short_name,
      logo: team.logo,
      country: team.country,
      city: team.city,
      stadium: team.stadium
    })
    .select("*")
    .single();

  if (teamError) {
    throw new Error(teamError.message);
  }

  const { data: career, error: careerError } = await supabase
    .from("careers")
    .insert({
      user_id: userId,
      name: career_name,
      club_name: savedTeam.name,
      club_logo: savedTeam.logo,
      country: savedTeam.country,
      league: null,
      initial_season: initial_season || "2025/26"
    })
    .select("*")
    .single();

  if (careerError) {
    throw new Error(careerError.message);
  }

  const { data: season, error: seasonError } = await supabase
    .from("seasons")
    .insert({
      career_id: career.id,
      season_name: initial_season || "2025/26"
    })
    .select("*")
    .single();

  if (seasonError) {
    throw new Error(seasonError.message);
  }

  const squad = await getTeamSquad(team.sportmonks_id);

  for (const player of squad) {
    const { data: savedPlayer, error: playerError } = await supabase
      .from("players")
      .insert(player)
      .select("*")
      .single();

    if (!playerError && savedPlayer) {
      await supabase.from("career_players").insert({
        career_id: career.id,
        player_id: savedPlayer.id,
        overall: savedPlayer.overall_current,
        market_value: savedPlayer.market_value,
        salary: savedPlayer.salary
      });
    }
  }

  return {
    career,
    season,
    team: savedTeam,
    imported_players: squad.length
  };
}

module.exports = {
  searchTeams,
  getTeamSquad,
  importTeamCareer
};