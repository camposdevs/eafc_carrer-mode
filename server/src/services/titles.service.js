const supabase = require("../config/supabase");

async function listTitles(careerId) {
  const { data, error } = await supabase
    .from("titles")
    .select("*")
    .eq("career_id", careerId)
    .order("season", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}

async function createTitle(payload) {
  const { data, error } = await supabase
    .from("titles")
    .insert(payload)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
}

async function updateTitle(id, payload) {
  const { data, error } = await supabase
    .from("titles")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
}

async function deleteTitle(id) {
  const { error } = await supabase
    .from("titles")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  return { message: "Título excluído com sucesso." };
}

module.exports = {
  listTitles,
  createTitle,
  updateTitle,
  deleteTitle
};