const favoritesService = require("../services/favorites.service");

async function index(req, res) {
  try {
    const favorites = await favoritesService.listFavorites(req.user.id);
    return res.json(favorites);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function store(req, res) {
  try {
    const { type, reference_id } = req.body;

    if (!type || !reference_id) {
      return res.status(400).json({
        message: "type e reference_id são obrigatórios."
      });
    }

    const favorite = await favoritesService.createFavorite(req.user.id, req.body);
    return res.status(201).json(favorite);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function destroy(req, res) {
  try {
    const result = await favoritesService.deleteFavorite(
      req.user.id,
      req.params.id
    );

    return res.json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = {
  index,
  store,
  destroy
};