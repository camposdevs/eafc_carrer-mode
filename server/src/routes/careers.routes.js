const express = require("express");
const careersController = require("../controllers/careers.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", careersController.index);
router.post("/", careersController.store);
router.get("/:id", careersController.show);
router.put("/:id", careersController.update);
router.delete("/:id", careersController.destroy);
router.post("/:id/duplicate", careersController.duplicate);

module.exports = router;