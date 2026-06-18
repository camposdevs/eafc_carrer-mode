const express = require("express");
const statsController = require("../controllers/stats.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/players", statsController.listPlayers);
router.post("/players", statsController.createPlayer);
router.put("/players/:id", statsController.updatePlayer);
router.delete("/players/:id", statsController.deletePlayer);

router.get("/team", statsController.getTeam);
router.post("/team", statsController.createTeam);
router.put("/team/:id", statsController.updateTeam);

module.exports = router;