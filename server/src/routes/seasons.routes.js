const express = require("express");
const seasonsController = require("../controllers/seasons.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", seasonsController.index);
router.post("/", seasonsController.store);
router.put("/:id", seasonsController.update);
router.delete("/:id", seasonsController.destroy);

module.exports = router;