const express = require("express");

const authRoutes = require("./auth.routes");
const careersRoutes = require("./careers.routes");
const playersRoutes = require("./players.routes");
const seasonsRoutes = require("./seasons.routes");
const matchesRoutes = require("./matches.routes");
const transfersRoutes = require("./transfers.routes");
const competitionsRoutes = require("./competitions.routes");
const titlesRoutes = require("./titles.routes");
const favoritesRoutes = require("./favorites.routes");
const sportmonksRoutes = require("./sportmonks.routes");

const router = express.Router();

router.get("/health", (req, res) => {
  return res.json({
    status: "ok",
    message: "EA FC Career API funcionando."
  });
});

router.use("/auth", authRoutes);
router.use("/careers", careersRoutes);
router.use("/players", playersRoutes);
router.use("/seasons", seasonsRoutes);
router.use("/matches", matchesRoutes);
router.use("/transfers", transfersRoutes);
router.use("/competitions", competitionsRoutes);
router.use("/titles", titlesRoutes);
router.use("/favorites", favoritesRoutes);
router.use("/sportmonks", sportmonksRoutes);

module.exports = router;