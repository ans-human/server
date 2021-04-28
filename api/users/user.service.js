const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      'insert into new_users(email, firstname, lastname, password) values(?, ?, ?, ?)',
      [
        data.email,
        data.firstName,
        data.lastName,
        data.password,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserByEmail: (email, callBack) => {
    pool.query(
      `select * from new_users where email = ?`,
      [email],
      (error, results) => {
        if (error) {
          callBack(error,0);
        }
        if( results.length )
        return callBack(null, results[0]);

        return callBack(null, 0);
      }
    );
  },
  getUserByUserId: (id, callBack) => {
    pool.query(
      `select * from new_users where id = ?`,
      [id],
      (error, results) => {
        if (error) {
          callBack(error,0);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUsers: callBack => {
    pool.query(
      `select email from new_users`,
      [],
      (error, results) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      `update new_users set email=?, firstname =?, lastname=?, password=? where id = ?`,
      [
        data.email,
        data.firstname,
        data.lastname,
        data.password,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteUser: (data, callBack) => {
    pool.query(
      `delete from new_users where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};
