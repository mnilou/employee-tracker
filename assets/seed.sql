-- values for department table 
INSERT INTO department
    (name)
VALUES
    ("Marketing"),
    ("Operations"),
    ("Human Resources"),
    ("Accounting");

-- values for role table
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Marketing Analyst", 600000, 1);
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
    ("Accountant", 750000, 4);
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Accountant Assistant", 45000, 4);

-- values for employee table
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Mally", "Zomorrodi", 1, 1);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Amir", "Alavi", 2, 2);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Lili", "Mostofi", 3, 2);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Ladan", "Daneshmand", 4, 3);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Stacie", "Mathews", 5, 3);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Oliver", "Brownfield", 6, 4);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Caspian", "Lawson", 7, 4);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Zephyr", "King", 8, 2);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Jill", "Gardner", 1, 3);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Roger", "Segalla", 6, 4);