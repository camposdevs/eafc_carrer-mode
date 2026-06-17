const titlesService = require("../services/titles.service");

async function index(req, res) {
  try {
    const titles = await titlesService.listTitles(req.query.career_id);
    return res.json(titles);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function store(req, res) {
  try {
    const { career_id, competition_name, season, club_name } = req.body;

    if (!career_id || !competition_name || !season || !club_name) {
      return res.status(400).json({
        message: "career_id, competition_name, season e club_name são obrigatórios."
      });
    }

    const title = await titlesService.createTitle(req.body);
    return res.status(201).json(title);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function update(req, res) {
  try {
    const title = await titlesService.updateTitle(req.params.id, req.body);
    return res.json(title);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function destroy(req, res) {
  try {
    const result = await titlesService.deleteTitle(req.params.id);
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