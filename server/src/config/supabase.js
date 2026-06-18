const { createClient } = require("@supabase/supabase-js");
const WebSocket = require("ws");
const env = require("./env");

const supabase = createClient(
  env.supabaseUrl,
  env.supabaseServiceRoleKey,
  {
    realtime: {
      transport: WebSocket
    }
  }
);

module.exports = supabase;