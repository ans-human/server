const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser
} = require("./user.controller");
// console.log("hello")
router.get("/", checkToken, getUsers);
router.post("/", createUser);
router.get("/:id", checkToken, getUserByUserId);
router.post("/login", login)+
router.patch("/", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser);

module.exports = router;
