const express = require("express");
const playersController = require("../controllers/players.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", playersController.index);
router.post("/", playersController.store);
router.get("/:id", playersController.show);
router.put("/:id", playersController.update);
router.delete("/:id", playersController.destroy);

module.exports = router;