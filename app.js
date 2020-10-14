const mysql = require('mysql');
const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
require('console.table');

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
// start connection to db
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('connected as id ' + connection.threadId + '\n');
  // create ASCII Art from text NEED HELP HERE??
  figlet('Employee Tracker', (err, data) => {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(chalk.yellowBright.bold.bgCyanBright(data));
    startApp();
  });
});
// start app with first question and prompt WHY IS THIS SHOWING UP TWICE??
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
    .then((answer) => {
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
        case 'Update Employee Role':
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
    'SELECT * from employee',
    // "SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.role_id LEFT JOIN department on role.department_id = department.department_id LEFT JOIN employee manager on manager.manager_id = employee.manager_id;",
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
// add an employee
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
      name: 'role_id',
    },
    {
      type: 'input',
      message: 'What is the department title (department_id)?',
      name: 'department_id',
    },
    {
      type: 'input',
      message: 'Assign a manager (manager_id)?',
      name: 'manager_id',
    },
  ];
  inquirer.prompt(questions).then((answer) => {
    connection.query(
      'INSERT INTO employee SET ?',
      {
        first_name: answer.first_name,
        last_name: answer.last_name,
        role_id: answer.role_id,
        manager_id: answer.manager_id,
      },
      function (error) {
        if (error) throw error;
        addEmp(answer.titleID, answer.managerID);
        console.table(`Updated ${answer.affectedRows} rows`);
        employeeView();
      }
    );
  });
}
// update employees role and department
function updateEmpRole() {
  const questions = [
    {
      type: 'input',
      name: 'employee_id',
      message: ' Please enter the employee id (employee_id)?',
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'What is the employees new role?',
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'What is the employees new department?',
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Who is the manager?',
    },
  ];
  inquirer.prompt(questions).then((answer) => {
    // UPDATE employee SET role_id = 8, department_id = 4, manager_id = 1 WHERE employee_id = 10;
    // version 2 - use object for the update values

    //    // version 1 - use array of values only
    // const sqlString = "UPDATE products SET price = ?, quantity = ? WHERE id = ?";
    // connection.query(sqlString, [2.5, 40, 2], (err, result) => {
    //   if (err) {
    //     throw err;
    //   }
    //   console.table(`Updated ${result.affectedRows} rows`)
    // })

    const query = connection.query(
      'UPDATE employee SET ? WHERE ?',
      [
        {
          role_id: answer.role_id,
          department_id: answer.department_id,
          manager_id: answer.manager_id,
        },
        {
          employee_id: answer.employee_id,
        },
      ],
      (error) => {
        if (error) {
          throw error;
        }
        console.table(`Updated ${answer.affectedRows} rows`);
        employeeView();
      }
    );
    console.log(query.sql);
  });
}

// add a department
function addDept() {
  inquirer
    .prompt({
      type: 'input',
      message: 'What would you like to name the new department?',
      name: 'department',
    })
    .then((answer) => {
      console.log(answer.department);
      connection.query(
        'INSERT INTO department SET ?',
        {
          name: answer.department,
        },
        function (error) {
          if (error) throw error;
          console.table(`Updated ${answer.affectedRows} rows`);
          startApp();
        }
      );
    });
}
// add a role
function addRole() {
  const questions = [
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
      type: 'input',
      message: 'What is the salary for this role?',
      name: 'salary',
    },
  ];
  inquirer.prompt(questions).then((answer) => {
    connection.query(
      'INSERT INTO role SET ?',
      {
        title: answer.title,
        department_id: answer.id,
        salary: answer.salary,
      },
      function (error, res) {
        if (error) throw error;
        console.table(`Updated ${answer.affectedRows} rows`);
        startApp();
      }
    );
  });
}
