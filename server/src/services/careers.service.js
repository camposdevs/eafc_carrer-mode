const supabase = require("../config/supabase");

async function listCareers(userId) {
  const { data, error } = await supabase
    .from("careers")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function createCareer(userId, payload) {
  const { data, error } = await supabase
    .from("careers")
    .insert({
      user_id: userId,
      name: payload.name,
      club_name: payload.club_name,
      club_logo: payload.club_logo || null,
      country: payload.country || null,
      league: payload.league || null,
      initial_season: payload.initial_season || "2025/26"
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function getCareerById(userId, careerId) {
  const { data, error } = await supabase
    .from("careers")
    .select("*")
    .eq("id", careerId)
    .eq("user_id", userId)
    .single();

  if (error) {
    throw new Error("Carreira não encontrada.");
  }

  return data;
}

async function updateCareer(userId, careerId, payload) {
  const { data, error } = await supabase
    .from("careers")
    .update(payload)
    .eq("id", careerId)
    .eq("user_id", userId)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function deleteCareer(userId, careerId) {
  const { error } = await supabase
    .from("careers")
    .delete()
    .eq("id", careerId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return {
    message: "Carreira excluída com sucesso."
  };
}

async function duplicateCareer(userId, careerId) {
  const original = await getCareerById(userId, careerId);

  const { data, error } = await supabase
    .from("careers")
    .insert({
      user_id: userId,
      name: `${original.name} - Cópia`,
      club_name: original.club_name,
      club_logo: original.club_logo,
      country: original.country,
      league: original.league,
      initial_season: original.initial_season,
      is_favorite: false,
      is_archived: false
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

module.exports = {
  listCareers,
  createCareer,
  getCareerById,
  updateCareer,
  deleteCareer,
  duplicateCareer
};