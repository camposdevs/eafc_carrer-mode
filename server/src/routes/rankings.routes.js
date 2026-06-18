const express = require("express");
const rankingsController = require("../controllers/rankings.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/players", rankingsController.playerRanking);
router.get("/market-value", rankingsController.marketValueRanking);

module.exports = router;