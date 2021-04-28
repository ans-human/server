const router = require("express").Router();
const { checkToken } = require("../../../auth/token_validation");
const {
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("./task.controller");

// console.log("inside task router")

router.post("/", checkToken, createTask);
router.get("/:id", checkToken, getTask);
router.patch("/:id", checkToken, updateTask);
router.delete("/:id", checkToken, deleteTask);

module.exports = router;
