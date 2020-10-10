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
// create ASCII Art from text
figlet('Employee Tracker', (err, result) => {
  console.log(err || result);
});
// start connection to db
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('connected as id ' + connection.threadId + '\n');
  startApp();
});
// start app with first question and prompt
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
    .then(function (answer) {
      switch (answer.choice) {
        case 'View All Employees':
          employeeView();
          break;
        case 'View All Departments':
          deptView();
          break;
        case 'View All Roles':
          roleView();
          break;
        case 'Add Employees':
          addEmp();
          break;
        case 'Add Departments':
          addDept();
          break;
        case 'Add Roles':
          addRole();
          break;
        case 'Update Employee Roles':
          updateEmpRole();
          break;
        case 'EXIT':
          connection.end();
          break;
      }
    });
};
// view all employees
function employeeView() {
  connection.query(
    "SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.role_id LEFT JOIN department on role.department_id = department.department_id LEFT JOIN employee manager on manager.manager_id = employee.manager_id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startApp();
    }
  );
}
// view all departments
function deptView() {
  connection.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}
// view all roles
function roleView() {
  connection.query('SELECT * FROM role', function (err, res) {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}
// add an employee here
function addEmp() {
  const questions = [
    {
      type: 'input',
      message: "What is the employee's first name?",
      name: 'first_name',
    },
    {
      type: 'input',
      message: "What is the employee's last name?",
      name: 'last_name',
    },
    {
      type: 'input',
      message: "What is the employee's title (role_id)?",
      name: 'titleID',
    },
    {
      type: 'input',
      message: "Who is the employee's manager (employee_id)?",
      name: 'managerID',
    },
  ];
  inquirer.prompt(questions).then(function (answer) {
    connection.query(
      'INSERT INTO employee SET ?',
      {
        first_name: answer.first_name,
        last_name: answer.last_name,
        role_id: answer.titleID,
        manager_id: answer.managerID,
      },
      function (error) {
        if (error) throw error;
        updateEmpManager(answer.titleID, answer.managerID);
        employeeView();
      }
    );
  });
}
// update employee roles
function updateEmpRole() {
  const employees = employeeView();
  const empChoices = employees.map((index) => {
    id: id;
  });
  inquirer.prompt({
    type: 'list',
    name: 'role id',
    message: ' Which role would you like to assign the employee?',
    choices: empChoices,
  });
  connection.query('UPDATE employee SET role_id = ? WHERE employee_id = ?', [
    roleID,
    empID,
  ]);
}
// add a department here
function addDept() {
  inquirer
    .prompt({
      type: 'input',
      message: 'What would you like to name the new department?',
      name: 'department',
    })
    .then(function (answer) {
      console.log(answer.department);
      connection.query(
        'INSERT INTO department SET ?',
        {
          name: answer.department,
        },
        function (err, res) {
          if (err) throw err;
          startApp();
        }
      );
    });
}
// add a role here
function addRole() {
  var questions = [
    {
      type: 'input',
      message: 'What type of role would you like to add?',
      name: 'title',
    },
    {
      type: 'input',
      message: 'In what department is the new role?',
      name: 'id',
    },
    {
      type: 'list',
      message: 'What is the salary for this role?',
      name: 'salary',
    },
  ];
  inquirer.prompt(questions).then(function (answer) {
    connection.query(
      'INSERT INTO role SET ?',
      {
        title: answer.title,
        department_id: answer.id,
        salary: answer.salary,
      },
      function (error, res) {
        if (error) throw error;
        startApp();
      }
    );
  });
}
