const env = require("./config/env");
const app = require("./app");

app.listen(env.port, () => {
  console.log(`EA FC Career API rodando na porta ${env.port}`);
});