  
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
         
      if (answer.access === "ADD") {insertData();}
        
      else if (answer.access === "VIEW") {dataView();}
           
      else if (answer.access === "UPDATE") {updateEmployee();}
      
      else if (answer.access === "DONE")
         {connection.end();}
    
    });
}

// function to view data in the table
dataView = () => {
  inquirer.prompt([
    {
      name: "viewType",
      type: "list",
      message: "Which table would you like to view?",
      choices: ["EMPLOYEES", "DEPARTMENTS", "ROLES", "EMPLOYEE-ROLES", "ROLE-DEPARTMENTS"]
    },
  ])
  .then((answer) =>{
    if (answer.viewType === "EMPLOYEES") 
      {viewEmployees();}
    else if (answer.viewType === "DEPARTMENTS") 
        {viewDepartments();}
           
    else if (answer.viewType === "ROLES")
        {viewRoles();}
      
    else if (answer.viewType ==="EMPLOYEE-ROLES")
          {viewJoinEmployeeRoles();}
        
      
    else if (answer.viewType === "ROLE-DEPARTMENTS") 
        {viewJoinDepartments();}      
  })
}


// Table View functions
function viewEmployees() {
  // QUERY DATABASE for employee data
  connection.query("SELECT * FROM employee", function(err, results) {
    if (err) throw err;
    console.table(results);

  start();
  })
}

function viewDepartments() {
  connection.query("SELECT * FROM department", function(err, results) {
    if (err) throw err;
    console.table(results);

  start();
  })
}

function viewRoles() {
  connection.query("SELECT * FROM job_duty", function(err, results) {
    if (err) throw err;
    console.table(results);

  start();
  })
}

function viewJoinEmployeeRoles() {
  connection.query("SELECT * FROM employee INNER JOIN job_duty on employee.employee_id = job_duty.job_duty_id", function(err, results) {
    if (err) throw err;
    console.table(results);

  start();
  })
}

function viewJoinDepartments() {
  connection.query("SELECT * FROM job_duty INNER JOIN department on  job_duty.job_duty_id = department.department_id", function(err, results) {
    if (err) throw err;
    console.table(results);

  start();
  })
}
// will need to combine first_name and last_name of the employees to full name inside the query call, then figure out what to update

// function to update employee roles
function updateEmployee () {
    //view function to see inner join employee and job_duty

   
   // inquirer.prompt to update title and role
    inquirer.prompt([{
      name: "title",
      type: "input",
      message: "Please type in [title] of role:",
    },
    {
      name: "job_duty_id",
      type: "Number",
      message: "Please type the [job_duty_id] of the job role (MUST BE A NUMERICAL VALUE):",
    },
  
  ]) 
  .then((answer) => {
    connection.query("UPDATE job_duty SET title = ? WHERE job_duty.job_duty_id = ?; ", { title: answer.title, job_duty_id: answer.job_duty_id, }, 
    function(err, res) {
      if (err) throw err;
      
      console.log("Succesfully Updated!");
      console.table(res);
      //Need to bring up different elements of the name
      
      start();

      })
    }
  )}

// functions to add data to the table 
insertData = () => {
  inquirer.prompt([
    {
      name: "insert",
      type: "list",
      message: "Which TABLE would you like to insert new data into?",
      choices: ["DEPARTMENT", "ROLE", "EMPLOYEE"],
    },
  ])
  .then((answer) => {
    if (answer.insert === "DEPARTMENT")
        {addDepartment();}
            
    else if (answer.insert === "ROLE")
        {addToRole();}
            
    else if(answer.insert === "EMPLOYEE")
        {addEmployee();}
  })
}

function addDepartment () {
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
        function(err, res) {
        if (err) throw err;
        console.table(res);
        console.log(`[DEPARTMENT]: ${answer.department} Successfully Added!`);
        
        }
      )
      start();
    })
    
    )
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
  function(err,res) {
    if (err) throw err;
    console.table(res);
    console.log(`Salary: ${answer.salary} and Title: ${answer.title} inserted successfully!`);
    
  }
  )
  start();
})
}
// Adding employee
function addEmployee () {
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
      first_name: answers.first,
      last_name: answers.last,
      job_duty_id: answers.job_duty_id
    }, 
    function(err, res) {
      if (err) throw err;
      console.table(res);
      console.log(`[FIRST_NAME]: ${answers.first} and LAST_NAME: ${answers.last} inserted successfully!`);
      
    }
    )
    start();
  })

}
