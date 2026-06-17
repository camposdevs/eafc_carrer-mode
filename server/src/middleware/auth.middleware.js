const jwt = require("jsonwebtoken");
const env = require("../config/env");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token não informado."
    });
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({
      message: "Token inválido."
    });
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);

    req.user = {
      id: decoded.id,
      email: decoded.email
    };

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Token expirado ou inválido."
    });
  }
}

module.exports = authMiddleware;