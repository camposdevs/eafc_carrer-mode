const seasonsService = require("../services/seasons.service");

async function index(req, res) {
  try {
    const seasons = await seasonsService.listSeasons(req.query.career_id);

    return res.json(seasons);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function store(req, res) {
  try {
    const { career_id, season_name } = req.body;

    if (!career_id || !season_name) {
      return res.status(400).json({
        message: "career_id e season_name são obrigatórios."
      });
    }

    const season = await seasonsService.createSeason(req.body);
    return res.status(201).json(season);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function update(req, res) {
  try {
    const season = await seasonsService.updateSeason(req.params.id, req.body);
    return res.json(season);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function destroy(req, res) {
  try {
    const result = await seasonsService.deleteSeason(req.params.id);
    return res.json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = {
  index,
  store,
  update,
  destroy
};