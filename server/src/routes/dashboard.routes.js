const express = require("express");
const dashboardController = require("../controllers/dashboard.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/summary", dashboardController.summary);
router.get("/goals-by-career", dashboardController.goalsByCareer);
router.get("/results-by-career", dashboardController.resultsByCareer);
router.get("/transfers-by-career", dashboardController.transfersByCareer);

module.exports = router;