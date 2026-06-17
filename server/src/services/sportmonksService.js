const sportmonksClient = require("../config/sportmonks");

async function searchTeams(query) {
  const response = await sportmonksClient.get("/teams/search", {
    params: { search: query }
  });

  return response.data;
}

async function getTeamById(teamId) {
  const response = await sportmonksClient.get(`/teams/${teamId}`, {
    params: { include: "country;venue;players" }
  });

  return response.data;
}

module.exports = {
  searchTeams,
  getTeamById
};
