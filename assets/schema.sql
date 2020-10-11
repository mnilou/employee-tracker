CREATE TABLE department
(
      department_id INT NOT NULL
      AUTO_INCREMENT,
name VARCHAR
      (30) NOT NULL,
PRIMARY KEY
      (department_id)
);
      CREATE TABLE role
      (
            role_id INT
            AUTO_INCREMENT,
title VARCHAR
            (30) NOT NULL,
salary DECIMAL
            (10,2) NOT NULL,
department_id INT DEFAULT 1,
PRIMARY KEY
            (role_id),
-- FOREIGN KEY(department_id) REFERENCES department(id), 
CONSTRAINT fk_department FOREIGN KEY
            (department_id) REFERENCES department
            (department_id) ON
            DELETE
            SET NULL
            );
            CREATE TABLE employee
            (
                  employee_id INT
                  AUTO_INCREMENT,
first_name VARCHAR
                  (30) NOT NULL,
last_name VARCHAR
                  (30) NOT NULL,
role_id INT, 
department_id INT DEFAULT 1,
manager_id INT,
PRIMARY KEY
                  (employee_id),
-- FOREIGN KEY(department_id) REFERENCES department(id),
-- FOREIGN KEY (manager_id) REFERENCES employee(id),
CONSTRAINT fk_role FOREIGN KEY
                  (role_id) REFERENCES role
                  (role_id) ON
                  DELETE
                  SET NULL
                  ,
CONSTRAINT fk_manager FOREIGN KEY
                  (manager_id) REFERENCES employee
                  (employee_id) ON
                  DELETE CASCADE
);