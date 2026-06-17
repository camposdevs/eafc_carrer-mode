const express = require("express");
const competitionsController = require("../controllers/competitions.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", competitionsController.index);
router.post("/", competitionsController.store);
router.put("/:id", competitionsController.update);
router.delete("/:id", competitionsController.destroy);

module.exports = router;