const supabase = require("../config/supabase");

async function listPlayerStats(seasonId) {
  const { data, error } = await supabase
    .from("player_stats")
    .select(`
      *,
      players (
        id,
        name,
        photo,
        position,
        nationality
      )
    `)
    .eq("season_id", seasonId)
    .order("goals", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}

async function createPlayerStats(payload) {
  const { data, error } = await supabase
    .from("player_stats")
    .insert(payload)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
}

async function updatePlayerStats(id, payload) {
  const { data, error } = await supabase
    .from("player_stats")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
}

async function deletePlayerStats(id) {
  const { error } = await supabase
    .from("player_stats")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  return {
    message: "Estatística do jogador excluída com sucesso."
  };
}

async function getTeamStats(seasonId) {
  const { data, error } = await supabase
    .from("team_stats")
    .select("*")
    .eq("season_id", seasonId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

async function createTeamStats(payload) {
  const goalDifference =
    Number(payload.goals_scored || 0) - Number(payload.goals_conceded || 0);

  const { data, error } = await supabase
    .from("team_stats")
    .insert({
      ...payload,
      goal_difference: goalDifference
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
}

async function updateTeamStats(id, payload) {
  const goalDifference =
    Number(payload.goals_scored || 0) - Number(payload.goals_conceded || 0);

  const { data, error } = await supabase
    .from("team_stats")
    .update({
      ...payload,
      goal_difference: goalDifference
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
}

module.exports = {
  listPlayerStats,
  createPlayerStats,
  updatePlayerStats,
  deletePlayerStats,
  getTeamStats,
  createTeamStats,
  updateTeamStats
};