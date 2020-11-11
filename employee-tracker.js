//dependencies
const inquirer = require("inquirer");
const express = require("express")
const app = express();
const table = require("console.table")
const mysql = require("mysql");


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "alpha",
  database: "employee_management"
});


// connection to the database
connection.connect(function(err) {
  if (err) throw err;
  // start function on what to do
  start();
});

// start function what would the user like to do?
function start() {
  inquirer.prompt({
      name: "access",
      type: "list",
      message: "Would you like to [ADD] employees [VIEW] existing employees or [UPDATE] employees?",
      choices: ["ADD", "VIEW", "UPDATE", "DONE"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.access === "ADD") {
        addEmployees();
      }
      else if(answer.view === "VIEW") {
       viewEmployees();
      
      } else if (answer.access === "UPDATE"){
        updateEmployee();

        
        
      } else if (answer.access === "DONE") {
        connection.end();
      }
    });
}





// function to add data to the table 
function addEmployees () {

}
 
// function to view data in the table
function viewEmployees() {
  // QUERY DATABASE for employee data
  connection.query("SELECT * FROM job_duty", function(err, results) {
    if (err) throw err;
    let view = table.getTable(results);
    console.log(view);

  //prompt of who to view
  inquirer.prompt()


  })
}

// function to update employee roles
function updateEmployee () {

}