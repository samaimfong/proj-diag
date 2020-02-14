const sqlite3 = require("sqlite3").verbose();
// const Promise = require('./node_modules/bluebird')

class AppDAO {
  // constructor

  // connect
  connect(dbFilePath) {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(dbFilePath, err => {
        if (err) {
          reject(new Error(err.message));
          // console.log('Could not connect to database', err)
        } else {
          resolve("Connected to database");
          // console.log('Connected to database')
        }
      });
    });
  }

  // run method
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          console.log("Error running sql " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }
  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log("Error running sql: " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log("Error running sql: " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  close() {
    this.db.close();
  }
}

module.exports = AppDAO;
