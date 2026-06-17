const express = require("express");
const matchesController = require("../controllers/matches.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", matchesController.index);
router.post("/", matchesController.store);
router.put("/:id", matchesController.update);
router.delete("/:id", matchesController.destroy);

module.exports = router;