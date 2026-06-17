const bcrypt = require("bcrypt");
const supabase = require("../config/supabase");
const generateToken = require("../utils/generateToken");

async function registerUser({ name, email, password }) {
  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (existingUser) {
    throw new Error("E-mail já cadastrado.");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert({
      name,
      email,
      password_hash: passwordHash
    })
    .select("id, name, email, created_at")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const token = generateToken(data);

  return {
    user: data,
    token
  };
}

async function loginUser({ email, password }) {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    throw new Error("E-mail ou senha inválidos.");
  }

  const passwordIsValid = await bcrypt.compare(password, user.password_hash);

  if (!passwordIsValid) {
    throw new Error("E-mail ou senha inválidos.");
  }

  const token = generateToken(user);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at
    },
    token
  };
}

async function getProfile(userId) {
  const { data, error } = await supabase
    .from("users")
    .select("id, name, email, created_at")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error("Usuário não encontrado.");
  }

  return data;
}

module.exports = {
  registerUser,
  loginUser,
  getProfile
};