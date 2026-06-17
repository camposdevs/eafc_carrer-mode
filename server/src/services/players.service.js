const supabase = require("../config/supabase");

async function listPlayers() {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);

  return data;
}

async function createPlayer(payload) {
  const { data, error } = await supabase
    .from("players")
    .insert(payload)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
}

async function getPlayerById(id) {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error("Jogador não encontrado.");

  return data;
}

async function updatePlayer(id, payload) {
  const { data, error } = await supabase
    .from("players")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
}

async function deletePlayer(id) {
  const { error } = await supabase
    .from("players")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  return {
    message: "Jogador excluído com sucesso."
  };
}

module.exports = {
  listPlayers,
  createPlayer,
  getPlayerById,
  updatePlayer,
  deletePlayer
};