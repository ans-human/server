const pool = require("../../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      'insert into new_todolist(email, task) values(?,?)',
      [
        data.email,
        data.title
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  get: (email, callBack) => {
    pool.query(
      `select * from new_todolist where email = ?`,
      [email],
      (error, results) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  
  update: (data, callBack) => {
    pool.query(
      `update new_todolist set task=? where id = ?`,
      [
        data.title,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  del: (data, callBack) => {
    pool.query(
      `delete from new_todolist where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, 1);
      }
    );
  },
  getTaskById: (id, callBack) => {
    pool.query(
      'select * from new_todolist where id = ?',
      [id],
      (error, results, fields) => {
        if( error ) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};
