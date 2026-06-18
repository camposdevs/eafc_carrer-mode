const supabase = require("../config/supabase");

async function getPlayerRanking(field, careerId) {
  const allowedFields = [
    "goals",
    "assists",
    "matches",
    "clean_sheets",
    "minutes_played"
  ];

  if (!allowedFields.includes(field)) {
    throw new Error("Campo de ranking inválido.");
  }

  const { data: seasons, error: seasonsError } = await supabase
    .from("seasons")
    .select("id")
    .eq("career_id", careerId);

  if (seasonsError) throw new Error(seasonsError.message);

  const seasonIds = seasons.map((season) => season.id);

  if (seasonIds.length === 0) return [];

  const { data, error } = await supabase
    .from("player_stats")
    .select(`
      id,
      ${field},
      players (
        id,
        name,
        photo,
        position,
        nationality
      )
    `)
    .in("season_id", seasonIds)
    .order(field, { ascending: false })
    .limit(20);

  if (error) throw new Error(error.message);

  return data.map((item, index) => ({
    position: index + 1,
    player_id: item.players?.id,
    player_name: item.players?.name,
    player_photo: item.players?.photo,
    player_position: item.players?.position,
    nationality: item.players?.nationality,
    value: item[field]
  }));
}

async function getMarketValueRanking(careerId) {
  const { data, error } = await supabase
    .from("career_players")
    .select(`
      id,
      market_value,
      players (
        id,
        name,
        photo,
        position,
        nationality
      )
    `)
    .eq("career_id", careerId)
    .order("market_value", { ascending: false })
    .limit(20);

  if (error) throw new Error(error.message);

  return data.map((item, index) => ({
    position: index + 1,
    player_id: item.players?.id,
    player_name: item.players?.name,
    player_photo: item.players?.photo,
    player_position: item.players?.position,
    nationality: item.players?.nationality,
    value: item.market_value
  }));
}

module.exports = {
  getPlayerRanking,
  getMarketValueRanking
};