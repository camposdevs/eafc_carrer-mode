const express = require("express");
const titlesController = require("../controllers/titles.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", titlesController.index);
router.post("/", titlesController.store);
router.put("/:id", titlesController.update);
router.delete("/:id", titlesController.destroy);

module.exports = router;