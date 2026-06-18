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

async function getTeam(req, res) {
  try {
    const team = await sportmonksService.getTeamById(req.params.id);

    return res.json(team);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

async function getSquad(req, res) {
  try {
    const { season_id } = req.query;

    const squad = await sportmonksService.getTeamSquad(
      req.params.id,
      season_id
    );

    return res.json(squad);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

async function importCareer(req, res) {
  try {
    const result = await sportmonksService.importCareerFromSportmonks(
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
  getTeam,
  getSquad,
  importCareer
};