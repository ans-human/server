const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createUser,
  login,
  getUserByEmail,
  getUsers,
  updateUsers,
  deleteUser
} = require("./user.controller");
// console.log("hello")

// router.get("/", getUsers);
// router.get("/:id", checkToken, getUserByUserEmail);

router.post("/signup", createUser);
router.post("/login", login);
router.patch("/", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser);

module.exports = router;
