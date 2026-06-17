const supabase = require("../config/supabase");

async function listFavorites(userId) {
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}

async function createFavorite(userId, payload) {
  const { data, error } = await supabase
    .from("favorites")
    .insert({
      user_id: userId,
      type: payload.type,
      reference_id: payload.reference_id
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
}

async function deleteFavorite(userId, id) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  return { message: "Favorito removido com sucesso." };
}

module.exports = {
  listFavorites,
  createFavorite,
  deleteFavorite
};