const csvparse = require('csv-parse')
const fs = require('fs')
const results = [];

class StateTouchesRepository {
    constructor(dao) {
      this.dao = dao
    }
    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS StateTouches (
        Id INTEGER PRIMARY KEY,
        State TEXT,
        StateTouches TEXT)`
      return this.dao.run(sql)
    }
  
    loaddata() {
        let counter = 0;
        fs.createReadStream('/home/darry/proj-diag/data/statetouches.csv')
        .pipe(csvparse())
        .on('error', function(error){
            console.log(error)
            })
        .on('data', (data) => {
                if(counter > 0){
                    // console.log(`data: ${data[0]}`);
                    //results.push(data) 
                    this.dao.run(`insert into StateTouches (Id, State, StateTouches)
                    values (?, ?, ?)`,[data[0],data[1],data[2]])
                }
                counter++;
            })
        .on('end', () => {
            // console.log(results);
        })
        // return this.dao.run('.import /home/darry/proj-diag/data/statetouches.csv StateTouches');
    }


}

module.exports = StateTouchesRepository;