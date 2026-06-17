const express = require("express");

const authRoutes = require("./auth.routes");
const careersRoutes = require("./careers.routes");

const router = express.Router();

router.get("/health", (req, res) => {
  return res.json({
    status: "ok",
    message: "EA FC Career Tracker API funcionando."
  });
});

router.use("/auth", authRoutes);
router.use("/careers", careersRoutes);

module.exports = router;