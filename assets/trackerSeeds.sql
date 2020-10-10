DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  flavor VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (flavor, price, quantity)
VALUES ("vanilla", 2.50, 100);

INSERT INTO products (flavor, price, quantity)
VALUES ("chocolate", 3.10, 120);

INSERT INTO products (flavor, price, quantity)
VALUES ("strawberry", 3.25, 75);

-- id - INT PRIMARY KEY

-- name - VARCHAR(30) to hold department name



-- role:


-- id - INT PRIMARY KEY

-- title -  VARCHAR(30) to hold role title

-- salary -  DECIMAL to hold role salary

-- department_id -  INT to hold reference to 


-- employee:


-- id - INT PRIMARY KEY

-- first_name - VARCHAR(30) to hold employee first name

-- last_name - VARCHAR(30) to hold employee last name

-- role_id - INT to hold reference to role employee has

-- manager_id - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
