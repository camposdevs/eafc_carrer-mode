const express = require("express");
const sportmonksController = require("../controllers/sportmonks.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/teams/search", sportmonksController.searchTeams);
router.post("/careers/import", sportmonksController.importCareer);

module.exports = router;