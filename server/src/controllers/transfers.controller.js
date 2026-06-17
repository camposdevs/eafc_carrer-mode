const transfersService = require("../services/transfers.service");

async function index(req, res) {
  try {
    const transfers = await transfersService.listTransfers(req.query.career_id);
    return res.json(transfers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function store(req, res) {
  try {
    const { career_id, player_id, type } = req.body;

    if (!career_id || !player_id || !type) {
      return res.status(400).json({
        message: "career_id, player_id e type são obrigatórios."
      });
    }

    const transfer = await transfersService.createTransfer(req.body);
    return res.status(201).json(transfer);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function update(req, res) {
  try {
    const transfer = await transfersService.updateTransfer(
      req.params.id,
      req.body
    );

    return res.json(transfer);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function destroy(req, res) {
  try {
    const result = await transfersService.deleteTransfer(req.params.id);
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