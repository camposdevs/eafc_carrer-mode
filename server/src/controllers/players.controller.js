const playersService = require("../services/players.service");

async function index(req, res) {
  try {
    const players = await playersService.listPlayers();
    return res.json(players);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function store(req, res) {
  try {
    if (!req.body.name) {
      return res.status(400).json({
        message: "Nome do jogador é obrigatório."
      });
    }

    const player = await playersService.createPlayer(req.body);
    return res.status(201).json(player);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function show(req, res) {
  try {
    const player = await playersService.getPlayerById(req.params.id);
    return res.json(player);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

async function update(req, res) {
  try {
    const player = await playersService.updatePlayer(req.params.id, req.body);
    return res.json(player);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function destroy(req, res) {
  try {
    const result = await playersService.deletePlayer(req.params.id);
    return res.json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = {
  index,
  store,
  show,
  update,
  destroy
};