const supabase = require("../config/supabase");

async function listCompetitions(careerId) {
  const { data, error } = await supabase
    .from("competitions")
    .select("*")
    .eq("career_id", careerId)
    .order("season", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}

async function createCompetition(payload) {
  const { data, error } = await supabase
    .from("competitions")
    .insert(payload)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
}

async function updateCompetition(id, payload) {
  const { data, error } = await supabase
    .from("competitions")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
}

async function deleteCompetition(id) {
  const { error } = await supabase
    .from("competitions")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  return { message: "Competição excluída com sucesso." };
}

module.exports = {
  listCompetitions,
  createCompetition,
  updateCompetition,
  deleteCompetition
};