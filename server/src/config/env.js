require("dotenv").config();

const env = {
  port: process.env.PORT || 3333,
  nodeEnv: process.env.NODE_ENV || "development",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  jwtSecret: process.env.JWT_SECRET,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  sportmonksApiToken: process.env.SPORTMONKS_API_TOKEN
};

module.exports = env;
