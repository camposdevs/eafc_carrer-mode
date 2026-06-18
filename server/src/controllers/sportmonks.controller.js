const sportmonksService = require("../services/sportmonks.service");

async function searchTeams(req, res) {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        message: "Informe o nome do time."
      });
    }

    const teams = await sportmonksService.searchTeams(query);

    return res.json(teams);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

async function importCareer(req, res) {
  try {
    const result = await sportmonksService.importTeamCareer(
      req.user.id,
      req.body
    );

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
}

module.exports = {
  searchTeams,
  importCareer
};