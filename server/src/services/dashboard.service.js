const supabase = require("../config/supabase");

async function getUserCareerIds(userId) {
  const { data, error } = await supabase
    .from("careers")
    .select("id")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  return data.map((career) => career.id);
}

async function getDashboardSummary(userId) {
  const careerIds = await getUserCareerIds(userId);

  if (careerIds.length === 0) {
    return {
      total_careers: 0,
      total_seasons: 0,
      total_matches: 0,
      total_titles: 0,
      total_goals: 0,
      total_wins: 0,
      total_draws: 0,
      total_losses: 0
    };
  }

  const { count: totalCareers } = await supabase
    .from("careers")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  const { count: totalSeasons } = await supabase
    .from("seasons")
    .select("*", { count: "exact", head: true })
    .in("career_id", careerIds);

  const { data: matches, error: matchesError } = await supabase
    .from("matches")
    .select("goals_for, result")
    .in("career_id", careerIds);

  if (matchesError) throw new Error(matchesError.message);

  const { count: totalTitles } = await supabase
    .from("titles")
    .select("*", { count: "exact", head: true })
    .in("career_id", careerIds);

  const totalGoals = matches.reduce(
    (sum, match) => sum + Number(match.goals_for || 0),
    0
  );

  const totalWins = matches.filter((match) => match.result === "W").length;
  const totalDraws = matches.filter((match) => match.result === "D").length;
  const totalLosses = matches.filter((match) => match.result === "L").length;

  return {
    total_careers: totalCareers || 0,
    total_seasons: totalSeasons || 0,
    total_matches: matches.length,
    total_titles: totalTitles || 0,
    total_goals: totalGoals,
    total_wins: totalWins,
    total_draws: totalDraws,
    total_losses: totalLosses
  };
}

async function getGoalsByCareer(userId) {
  const careerIds = await getUserCareerIds(userId);

  if (careerIds.length === 0) return [];

  const { data: careers, error: careersError } = await supabase
    .from("careers")
    .select("id, name")
    .eq("user_id", userId);

  if (careersError) throw new Error(careersError.message);

  const { data: matches, error: matchesError } = await supabase
    .from("matches")
    .select("career_id, goals_for")
    .in("career_id", careerIds);

  if (matchesError) throw new Error(matchesError.message);

  return careers.map((career) => {
    const goals = matches
      .filter((match) => match.career_id === career.id)
      .reduce((sum, match) => sum + Number(match.goals_for || 0), 0);

    return {
      career: career.name,
      goals
    };
  });
}

async function getResultsByCareer(userId) {
  const careerIds = await getUserCareerIds(userId);

  if (careerIds.length === 0) return [];

  const { data: careers, error: careersError } = await supabase
    .from("careers")
    .select("id, name")
    .eq("user_id", userId);

  if (careersError) throw new Error(careersError.message);

  const { data: matches, error: matchesError } = await supabase
    .from("matches")
    .select("career_id, result")
    .in("career_id", careerIds);

  if (matchesError) throw new Error(matchesError.message);

  return careers.map((career) => {
    const careerMatches = matches.filter(
      (match) => match.career_id === career.id
    );

    return {
      career: career.name,
      wins: careerMatches.filter((match) => match.result === "W").length,
      draws: careerMatches.filter((match) => match.result === "D").length,
      losses: careerMatches.filter((match) => match.result === "L").length
    };
  });
}

async function getTransfersByCareer(userId) {
  const careerIds = await getUserCareerIds(userId);

  if (careerIds.length === 0) return [];

  const { data: careers, error: careersError } = await supabase
    .from("careers")
    .select("id, name")
    .eq("user_id", userId);

  if (careersError) throw new Error(careersError.message);

  const { data: transfers, error: transfersError } = await supabase
    .from("transfers")
    .select("career_id, type")
    .in("career_id", careerIds);

  if (transfersError) throw new Error(transfersError.message);

  return careers.map((career) => {
    const careerTransfers = transfers.filter(
      (transfer) => transfer.career_id === career.id
    );

    return {
      career: career.name,
      compras: careerTransfers.filter((transfer) => transfer.type === "compra")
        .length,
      vendas: careerTransfers.filter((transfer) => transfer.type === "venda")
        .length,
      emprestimos: careerTransfers.filter(
        (transfer) => transfer.type === "emprestimo"
      ).length
    };
  });
}

module.exports = {
  getDashboardSummary,
  getGoalsByCareer,
  getResultsByCareer,
  getTransfersByCareer
};