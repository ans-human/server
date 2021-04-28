const {
    create,
    update,
    get,
    del,
    getTaskById
  } = require("./task.service");
  const { hashSync, genSaltSync, compareSync } = require("bcrypt");
  const { sign } = require("jsonwebtoken");
  const { getUserByUserId } = require("../user.service");
  

  module.exports = {
    createTask: (req, res) => {
      const body = req.body;
      //  console.log(body);
      
      create(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        // console.log(results);
        const id = results.insertId;
        getTaskById(id, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection errror"
            });
          }
          // console.log(results);
          return res.json({
            data: results
          })
        });
      });
    },
    getTask: (req, res) => {
      const id = req.params.id;
      // console.log('getTask', id);
      getUserByUserId(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        // console.log(results);
        if (!results) {
          return res.json({
            success: 0,
            message: "Record not Found"
          });
        }
        results.password = undefined;
        get(results.email, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          // console.log(results);
          return res.json({
            success: 1,
            data: results
          });
        });
      });
      
    },

    updateTask: (req, res) => {
      const task = req.body;
      const id = req.params.id;
      console.log(id, task);
      update({...task, id}, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        
        const new_task = {id: parseInt(id), email: task.email, task: task.title};
        console.log('backend', new_task);
        return res.json({
          success: 1,
          message: "updated successfully",
          task: new_task,
        });
      });
    },
    deleteTask: (req, res) => {
      const data = req.body;
      const id = req.params.id;
      del({...data, id}, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        // console.log(results);
        if (!results) {
          return res.json({
            success: 0,
            message: "Record Not Found"
          });
        }
        return res.json({
          success: 1,
          message: "task deleted successfully"
        });
      });
    }
  };
  