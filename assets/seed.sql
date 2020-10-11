-- values for department table 
INSERT INTO department
    (name)
VALUES
    ("Marketing"),
    ("Operations"),
    ("Human Resources"),
    ("Accounting");

-- values for role table 1 - 8
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Marketing Analyst", 60000, 1);
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Marketing Coordinator", 40000, 1);
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Customer Service", 50000, 2);
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("IT", 80000, 2);
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("HR Specialist", 60000, 3);
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("HR Assistant", 40000, 3);
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Accountant", 75000, 4);
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Accountant Assistant", 45000, 4);

-- values for employee table
INSERT INTO employee
    (first_name, last_name, department_id, role_id, manager_id)
VALUES
    ("Mally", "Zomorrodi", NULL, NULL, 1);
INSERT INTO employee
    (first_name, last_name, department_id, role_id, manager_id)
VALUES
    ("Amir", "Alavi", 1, 1, 1);
INSERT INTO employee
    (first_name, last_name, department_id, role_id, manager_id)
VALUES
    ("Lili", "Mostofi", 1, 2, 1);
INSERT INTO employee
    (first_name, last_name, department_id, role_id, manager_id)
VALUES
    ("Ladan", "Daneshmand", 2, 3, 1);
INSERT INTO employee
    (first_name, last_name, department_id, role_id, manager_id)
VALUES
    ("Stacie", "Mathews", 2, 4, 1);
INSERT INTO employee
    (first_name, last_name, department_id, role_id, manager_id)
VALUES
    ("Oliver", "Brownfield", 3, 5, 1);
INSERT INTO employee
    (first_name, last_name, department_id, role_id, manager_id)
VALUES
    ("Caspian", "Lawson", 3, 6, 1);
INSERT INTO employee
    (first_name, last_name, department_id, role_id, manager_id)
VALUES
    ("Zephyr", "King", 4, 7, 1);
INSERT INTO employee
    (first_name, last_name, department_id, role_id, manager_id)
VALUES
    ("Jill", "Gardner", 4, 8, 1);
INSERT INTO employee
    (first_name, last_name, department_id, role_id, manager_id)
VALUES
    ("Roger", "Segalla", 2, 3, 1);

SELECT *
FROM employee;
SELECT *
FROM department;
SELECT *
FROM role;