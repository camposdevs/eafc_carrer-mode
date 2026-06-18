const statsService = require("../services/stats.service");

async function listPlayers(req, res) {
  try {
    const { season_id } = req.query;

    if (!season_id) {
      return res.status(400).json({
        message: "season_id é obrigatório."
      });
    }

    const stats = await statsService.listPlayerStats(season_id);

    return res.json(stats);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function createPlayer(req, res) {
  try {
    const { season_id, player_id } = req.body;

    if (!season_id || !player_id) {
      return res.status(400).json({
        message: "season_id e player_id são obrigatórios."
      });
    }

    const stats = await statsService.createPlayerStats(req.body);

    return res.status(201).json(stats);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function updatePlayer(req, res) {
  try {
    const stats = await statsService.updatePlayerStats(
      req.params.id,
      req.body
    );

    return res.json(stats);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function deletePlayer(req, res) {
  try {
    const result = await statsService.deletePlayerStats(req.params.id);

    return res.json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function getTeam(req, res) {
  try {
    const { season_id } = req.query;

    if (!season_id) {
      return res.status(400).json({
        message: "season_id é obrigatório."
      });
    }

    const stats = await statsService.getTeamStats(season_id);

    return res.json(stats);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

async function createTeam(req, res) {
  try {
    const { season_id } = req.body;

    if (!season_id) {
      return res.status(400).json({
        message: "season_id é obrigatório."
      });
    }

    const stats = await statsService.createTeamStats(req.body);

    return res.status(201).json(stats);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function updateTeam(req, res) {
  try {
    const stats = await statsService.updateTeamStats(req.params.id, req.body);

    return res.json(stats);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = {
  listPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
  getTeam,
  createTeam,
  updateTeam
};