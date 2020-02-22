const csvparse = require("csv-parse");
const fs = require("fs");
const results = [];

class StateTouchesRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createTable() {
    const sql = `
  CREATE TABLE IF NOT EXISTS StateTouches (
    Id INTEGER PRIMARY KEY,
    State TEXT,
    StateTouches TEXT)`;
    return new Promise((resolve, reject) => {
      console.log("execute sql:", sql);
      const params = [];
      this.dao.db.run(sql, params, function(err) {
        if (err) {
          console.log("Error running sql " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve("StateTouches table was created.");
        }
      });
    });
  }

  loaddata() {
    let counter = 0;
    return new Promise((resolve, reject) => {
      fs.createReadStream("/mnt/data/data/statetouches.csv")
        .pipe(csvparse())
        .on("error", function(error) {
          console.log("Error Loading external data: " + sql);
          reject(err);
        })
        .on("data", data => {
          if (counter > 0) {
            // console.log(`data: ${data[0]}`);
            //results.push(data)

            this.dao.db.run(
              `insert into StateTouches (Id, State, StateTouches)
                    values (?, ?, ?)`,
              [data[0], data[1], data[2]]
            );
          }
          counter++;
        })
        .on("end", () => {
          console.log("finish loading data, # of lines:", counter);
          resolve(counter);
        });
    });
    // return this.dao.run('.import /home/darry/proj-diag/data/statetouches.csv StateTouches');
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.dao.db.all(sql, params, (err, rows) => {
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
}

module.exports = StateTouchesRepository;
