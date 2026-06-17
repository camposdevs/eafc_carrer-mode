const competitionsService = require("../services/competitions.service");

async function index(req, res) {
  try {
    const competitions = await competitionsService.listCompetitions(
      req.query.career_id
    );

    return res.json(competitions);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function store(req, res) {
  try {
    const { career_id, name, type } = req.body;

    if (!career_id || !name || !type) {
      return res.status(400).json({
        message: "career_id, name e type são obrigatórios."
      });
    }

    const competition = await competitionsService.createCompetition(req.body);
    return res.status(201).json(competition);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function update(req, res) {
  try {
    const competition = await competitionsService.updateCompetition(
      req.params.id,
      req.body
    );

    return res.json(competition);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function destroy(req, res) {
  try {
    const result = await competitionsService.deleteCompetition(req.params.id);
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