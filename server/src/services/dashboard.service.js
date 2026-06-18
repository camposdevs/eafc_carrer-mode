const supabase = require("../config/supabase");

async function getSummary(userId) {
  const { data: careers } = await supabase
    .from("careers")
    .select("*")
    .eq("user_id", userId);

  const careerIds = careers.map((c) => c.id);

  const { data: seasons } = await supabase
    .from("seasons")
    .select("*")
    .in("career_id", careerIds);

  const { data: matches } = await supabase
    .from("matches")
    .select("*")
    .in("career_id", careerIds);

  const { data: titles } = await supabase
    .from("titles")
    .select("*")
    .in("career_id", careerIds);

  const totalGoals =
    matches?.reduce((acc, item) => {
      return acc + (item.goals_for || 0);
    }, 0) || 0;

  const totalWins =
    matches?.filter((m) => m.result === "W").length || 0;

  const totalDraws =
    matches?.filter((m) => m.result === "D").length || 0;

  const totalLosses =
    matches?.filter((m) => m.result === "L").length || 0;

  return {
    total_careers: careers.length,
    total_seasons: seasons.length,
    total_matches: matches.length,
    total_titles: titles.length,
    total_goals: totalGoals,
    total_wins: totalWins,
    total_draws: totalDraws,
    total_losses: totalLosses
  };
}

module.exports = {
  getSummary
};