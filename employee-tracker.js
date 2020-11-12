  
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
        addEmployeeToDepartment();
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

// function to view data in the table
function viewEmployees() {
  // QUERY DATABASE for employee data
  connection.query("SELECT * FROM job_duty", function(err, results) {
    if (err) throw err;
    let view = table.getTable(results);
    console.log(view);

  //prompt of who to view



  })
}
// will need to combine first_name and last_name of the employees to full name inside the query call, then figure out what to update
// function to update employee roles
function updateEmployee () {
  connection.query("SELECT * FROM employee", function(err, results) { 
    if (err) throw err;
   // inquirer.prompt to add in all the updates
    inquirer.prompt([{
      name: "updateSelector",
      type: "list",
      message: "Please Select an Employee to update:",
      choices: function() {
        let choiceArray = [];
        for (var i = 0; i < results.length; i++) {
          choiceArray.push(results[i].first_name);
        }
        return choiceArray;
      },

    }]) 
    // then else if statement to trigger update role or department
  })

  // update role query database to update person's role

  // update department query database to update department
    
  
   // log updates

  // if possible log updates returned to the console

}


// database prompts

// department table prompt

// function to add data to the table 
// addToDEpartment
function addEmployeeToDepartment () {
  inquirer
  .prompt([
    {
      name: "department",
      type: "input",
      message: "Name of the Department?"
    }])
    .then((answer => {
      connection.query("INSERT INTO department SET ?", 
      {
        name: answer.department
        },        
        function(err) {
        if (err) throw err;
        console.log("Your department was added successfully!");
        addToRole();
        }
      )

    }))
}

//addToEmployee
function addToRole() {
  //inquirer prompt for department set
  inquirer.prompt([

    {
      name: "title",
      type: "input",
      message:"What is the job title of this employee?"
  },
  {
    name: "salary",
    type: "number",
    message:"What is the salary of this employee (Please enter a numerical value)?"
  }, 
  {
    name: "job_duty_id",
    type: "number",
    message: "Please enter the Department ID that this company will be in:"
  }
]).then((answers) => {
  connection.query("INSERT INTO job_duty SET ?", 
  {
    title: answers.title,
    salary: answers.salary,
    job_duty_id: answers.job_duty_id,
  }, 
  function(err) {
    if (err) throw err;
    console.log("Salary and Title added successfully!");
    employeeName();
  }
  )

})
}

function employeeName () {
  inquirer.prompt([
    {
      name: "first",
      type: "input",
      message:"What is this employee's First Name?"
    },
    {
      
    name: "last",
    type: "input",
    message: "What is this employee's last name?"
    },
    {
      name: "job_duty_id",
      type: "number",
      message: "What is the Job_Duty_ID value for this role (MUST BE A NUMERICAL VALUE)?"
    }
  ])
  .then((answers) => {
    connection.query("INSERT INTO employee SET ?", 
    {
      first_name: answers.first_name,
      last_name: answers.last_name,
      job_duty_id: answers.job_duty_id
    }, 
    function(err) {
      if (err) throw err;
      start();
    }
    )
    
  })

}
