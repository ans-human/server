const {
    create,
    getUserByEmail,
    getUserByUserId,
    getUsers,
    updateUser,
    deleteUser
  } = require("./user.service");
  const { hashSync, genSaltSync, compareSync } = require("bcrypt");
  const { sign } = require("jsonwebtoken");
  
  module.exports = {
    createUser: (req, res) => {
      const body = req.body;
      console.log(body);
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      create(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.json({
            success: 0,
            message: "Database connection errror"
          });
        }
        getUserByEmail(body.email, (err, results) => {
          if (err) {
            console.log(err);
          }
          console.log(results)
          if (!results) {
            return res.json({
              success: 0,
              data: "Invalid username or password"
            });
          }
          console.log(results);
          if (results) {
            results.password = undefined;
            
            const jsontoken = sign({ email: results.email, id: results.id }, process.env.JWT_KEY, {expiresIn: "1h"});
            
            const name = results.firstname + ' ' + results.lastname;
            const new_results = {...results, name: name};
            return res.json({
              success: 1,
              message: "login successfully",
              result: new_results,
              token: jsontoken
            });
  
          } else {
            return res.json({
              success: 0,
              data: "Invalid username or password"
            });
          }
        });
        // const _id = results.insertId;
        // const result = {...results, id: _id};
        // console.log(results);
        // return res.status(200).json({
        //   success: 1,
        //   data: results,
        //   result: result,
        // });
      });
    },
    login: (req, res) => {
      const body = req.body;
      getUserByEmail(body.email, (err, results) => {
        if (err) {
          console.log(err);
          return res.json({
            success: 0,
            data: "Invalid username or password"
          });
        }
        console.log(results)
        if (!results) {
          return res.json({
            success: 0,
            data: "Invalid username or password"
          });
        }
        const result = compareSync(body.password, results.password);
        // const result = (body.password === results.password);
        console.log(result);
        console.log(results.password, body.password)
        if (result) {
          results.password = undefined;
          
          const jsontoken = sign({ email: results.email, id: results.id }, process.env.JWT_KEY, {expiresIn: "1h"});
          
          const name = results.firstname + ' ' + results.lastname;
          const new_results = {...results, name: name};
          return res.json({
            success: 1,
            message: "login successfully",
            result: new_results,
            token: jsontoken
          });

        } else {
          return res.json({
            success: 0,
            data: "Invalid username or password"
          });
        }
      });
    },
    getUserByUserId: (req, res) => {
      const id = req.params.id;

      getUserByUserId(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record not Found"
          });
        }
        results.password = undefined;
        return res.json({
          success: 1,
          data: results
        });
      });
    },
    getUsers: (req, res) => {
      getUsers((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results
        });
      });
    },
    updateUsers: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      updateUser(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          message: "updated successfully"
        });
      });
    },
    deleteUser: (req, res) => {
      const data = req.body;
      deleteUser(data, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record Not Found"
          });
        }
        return res.json({
          success: 1,
          message: "user deleted successfully"
        });
      });
    }
  };
  