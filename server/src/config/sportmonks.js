const axios = require("axios");
const env = require("./env");

const sportmonksClient = axios.create({
  baseURL: "https://api.sportmonks.com/v3/football",
  timeout: 20000,
  params: {
    api_token: env.sportmonksApiToken
  }
});

module.exports = sportmonksClient;
