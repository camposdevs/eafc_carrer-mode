const supabase = require("../config/supabase");

async function listTransfers(careerId) {
  const { data, error } = await supabase
    .from("transfers")
    .select("*")
    .eq("career_id", careerId)
    .order("transfer_date", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}

async function createTransfer(payload) {
  const { data, error } = await supabase
    .from("transfers")
    .insert(payload)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
}

async function updateTransfer(id, payload) {
  const { data, error } = await supabase
    .from("transfers")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
}

async function deleteTransfer(id) {
  const { error } = await supabase
    .from("transfers")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  return { message: "Transferência excluída com sucesso." };
}

module.exports = {
  listTransfers,
  createTransfer,
  updateTransfer,
  deleteTransfer
};