// import Promise from "bluebird";
const AppDAO = require("./dao");
const StateRepository = require("./StateTouches_repository");

function main() {
  console.log("Enter main() function:");
  const dao = new AppDAO();
  dao
    .connect(":memory:")
    // .connect()
    .then(
      // const sLogic = new StateRepository();
      // result => console.log("result of connect:", result)
      function(result) {
        console.log("result of connect:", result);
        const s = new StateRepository(dao);
        s.createTable()
          .then(function(result) {
            console.log("result of create table:", result);
            s.loaddata()
              .then(function(result) {
                console.log(
                  "data load complete with record count of :",
                  result
                );
                s.all("select * from StateTouches limit 10;")
                  .then(function(result) {
                    console.log(result);
                  })
                  .catch(err => console.log("error : ", err.message));
              })
              .catch(err => console.log("error : ", err.message));
          })
          .catch(err => console.log("error : ", err.message));
      }
    )
    .catch(err => console.log("error : ", err.message));
  /*   const dao = new AppDAO(':memory:')
  const s = new StateRepository(dao)
  let projectid

  s.createTable()
  .then(() => s.loaddata())
  .then(
        dao.all('select * from StateTouches',[])
    )
    console.log(`finish`)


  )
 */
}

main();

// const sqlite3 = require('sqlite3').verbose();

// let db = new sqlite3.Database(':memory:', (err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log('Connected to the in-memory SQlite database.');
//   });

//   db.run('CREATE TABLE StateTouches(Id int, State varchar(2),  StateTouches varchar(2));',
//     function(err){
//     if(err){
//       return console.log(err.message)
//     }
//     console.log('Table Created')
//     let sql = `select count(*) from StateTouches`;
//     db.each(sql,[], (err, row) => {
//         if (err) {
//             console.log(err);
//         }
//         // console.log(`${row.Id} ${row.State} ${row.StateTouches}`);
//         console.log(row);
//     });
//   }
//   );
//db.run('Create Index idx_StateTouches_State on StateTouches (State);');
//db.run('Create Index idx_StateTouches_StateTouches on StateTouches (StateTouches);');
// db.run('.mode csv StateTouches');
// db.run('.import /home/darry/proj-diag/data/statetouches.csv StateTouches');

// db.close();
