const matchesService = require("../services/matches.service");

async function index(req, res) {
  try {
    const matches = await matchesService.listMatches(req.query.career_id);
    return res.json(matches);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function store(req, res) {
  try {
    const { career_id, opponent } = req.body;

    if (!career_id || !opponent) {
      return res.status(400).json({
        message: "career_id e opponent são obrigatórios."
      });
    }

    const match = await matchesService.createMatch(req.body);
    return res.status(201).json(match);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function update(req, res) {
  try {
    const match = await matchesService.updateMatch(req.params.id, req.body);
    return res.json(match);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function destroy(req, res) {
  try {
    const result = await matchesService.deleteMatch(req.params.id);
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