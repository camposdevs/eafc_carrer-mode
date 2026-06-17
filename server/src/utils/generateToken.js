const jwt = require("jsonwebtoken");
const env = require("../config/env");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    env.jwtSecret,
    {
      expiresIn: "7d"
    }
  );
}

module.exports = generateToken;