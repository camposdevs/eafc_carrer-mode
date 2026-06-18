const express = require("express");

const controller = require("../controllers/dashboard.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/summary", controller.getSummary);

module.exports = router;