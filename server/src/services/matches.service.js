const supabase = require("../config/supabase");

async function listMatches(careerId) {
  const { data, error } = await supabase
    .from("matches")
    .select("*")
    .eq("career_id", careerId)
    .order("match_date", { ascending: true });

  if (error) throw new Error(error.message);

  return data;
}

async function createMatch(payload) {
  const { data, error } = await supabase
    .from("matches")
    .insert(payload)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
}

async function updateMatch(id, payload) {
  const { data, error } = await supabase
    .from("matches")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
}

async function deleteMatch(id) {
  const { error } = await supabase
    .from("matches")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  return {
    message: "Partida excluída com sucesso."
  };
}

module.exports = {
  listMatches,
  createMatch,
  updateMatch,
  deleteMatch
};