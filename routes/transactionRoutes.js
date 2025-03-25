const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, transactionController.recordTransaction);

module.exports = router;
