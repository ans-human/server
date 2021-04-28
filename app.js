require("dotenv").config();
const cors = require('cors');
const express = require("express");
const userRouter = require("./api/users/user.router");
const taskRouter = require("./api/users/tasks/task.router");

const app = express();
app.use(express.json());

app.use(cors());
app.use("/api/users", userRouter);
app.use("/api/users/tasks", taskRouter);

const port = process.env.APP_PORT || 5000;
app.listen(port,  () => {
  console.log("server up and running on PORT :", port);
});
