const mysql = require('mysql');
const inquirer = require('inquirer');
const {printTable} = require('console.table');
const figlet = require('figlet');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'password',
  database: 'employee_trackerDB',
});

figlet('Employee Tracker', (err, result) => {
  console.log(err || result);
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('connected as id ' + connection.threadId + '\n');
  startApp();
});
startApp = () => {
  inquirer
    .prompt([
      {
        name: 'choice',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View All Employees',
          'View All Departments',
          'View All Roles',
          'Add Employees',
          'Add Departments',
          'Add Roles',
          'Update Employee Role',
          'EXIT',
        ],
      },
    ])
    .then(function(answer) {
      switch (answer.choice) {
        case "View All Employees":
          empAllSearch();
          break;
        case "View All Departments":
          deptSearch();
          break;
        case "View All Roles":
          roleSearch();
          break;
        case "Add Employees":
          addEmp();
          break;
        case "Add Departments":
          addDept();
          break;
        case "Add Roles":
          addRole();
          break;
        case "Update Employee Roles":
          updateEmpRole();
          break;
        case "EXIT":
          connection.end();
          break;
      }
    });
};
