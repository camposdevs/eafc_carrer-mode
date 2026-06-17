const careersService = require("../services/careers.service");

async function index(req, res) {
  try {
    const careers = await careersService.listCareers(req.user.id);
    return res.json(careers);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

async function store(req, res) {
  try {
    const { name, club_name } = req.body;

    if (!name || !club_name) {
      return res.status(400).json({
        message: "Nome da carreira e clube são obrigatórios."
      });
    }

    const career = await careersService.createCareer(req.user.id, req.body);
    return res.status(201).json(career);
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
}

async function show(req, res) {
  try {
    const career = await careersService.getCareerById(
      req.user.id,
      req.params.id
    );

    return res.json(career);
  } catch (error) {
    return res.status(404).json({
      message: error.message
    });
  }
}

async function update(req, res) {
  try {
    const career = await careersService.updateCareer(
      req.user.id,
      req.params.id,
      req.body
    );

    return res.json(career);
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
}

async function destroy(req, res) {
  try {
    const result = await careersService.deleteCareer(
      req.user.id,
      req.params.id
    );

    return res.json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
}

async function duplicate(req, res) {
  try {
    const career = await careersService.duplicateCareer(
      req.user.id,
      req.params.id
    );

    return res.status(201).json(career);
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
}

module.exports = {
  index,
  store,
  show,
  update,
  destroy,
  duplicate
};