const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");

// GET
router.get("/", usersController.getAll);

// GET por ID
router.get("/:id", usersController.getById);

// POST
router.post("/", usersController.create);

// PUT
router.put("/:id", usersController.update);

// DELETE
router.delete("/:id", usersController.remove);

module.exports = router;
