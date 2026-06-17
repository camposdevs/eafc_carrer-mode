require("dotenv").config();

const env = {
  port: process.env.PORT || 3333,
  jwtSecret: process.env.JWT_SECRET,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  sportmonksApiToken: process.env.SPORTMONKS_API_TOKEN
};

module.exports = env;