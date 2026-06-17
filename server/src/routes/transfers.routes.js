const express = require("express");
const transfersController = require("../controllers/transfers.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", transfersController.index);
router.post("/", transfersController.store);
router.put("/:id", transfersController.update);
router.delete("/:id", transfersController.destroy);

module.exports = router;