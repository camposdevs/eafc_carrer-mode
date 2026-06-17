const express = require("express");
const favoritesController = require("../controllers/favorites.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", favoritesController.index);
router.post("/", favoritesController.store);
router.delete("/:id", favoritesController.destroy);

module.exports = router;