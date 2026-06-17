const supabase = require("../config/supabase");

async function listSeasons(careerId) {
  const { data, error } = await supabase
    .from("seasons")
    .select("*")
    .eq("career_id", careerId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}

async function createSeason(payload) {
  const { data, error } = await supabase
    .from("seasons")
    .insert(payload)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
}

async function updateSeason(id, payload) {
  const { data, error } = await supabase
    .from("seasons")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
}

async function deleteSeason(id) {
  const { error } = await supabase
    .from("seasons")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  return {
    message: "Temporada excluída com sucesso."
  };
}

module.exports = {
  listSeasons,
  createSeason,
  updateSeason,
  deleteSeason
};