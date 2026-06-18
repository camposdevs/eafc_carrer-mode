const rankingsService = require("../services/rankings.service");

async function playerRanking(req, res) {
  try {
    const { career_id, field } = req.query;

    if (!career_id || !field) {
      return res.status(400).json({
        message: "career_id e field são obrigatórios."
      });
    }

    const data = await rankingsService.getPlayerRanking(field, career_id);

    return res.json(data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function marketValueRanking(req, res) {
  try {
    const { career_id } = req.query;

    if (!career_id) {
      return res.status(400).json({
        message: "career_id é obrigatório."
      });
    }

    const data = await rankingsService.getMarketValueRanking(career_id);

    return res.json(data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = {
  playerRanking,
  marketValueRanking
};