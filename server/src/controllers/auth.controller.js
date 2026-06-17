const authService = require("../services/auth.service");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Nome, e-mail e senha são obrigatórios."
      });
    }

    const result = await authService.registerUser({
      name,
      email,
      password
    });

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "E-mail e senha são obrigatórios."
      });
    }

    const result = await authService.loginUser({
      email,
      password
    });

    return res.json(result);
  } catch (error) {
    return res.status(401).json({
      message: error.message
    });
  }
}

async function profile(req, res) {
  try {
    const user = await authService.getProfile(req.user.id);

    return res.json(user);
  } catch (error) {
    return res.status(404).json({
      message: error.message
    });
  }
}

module.exports = {
  register,
  login,
  profile
};