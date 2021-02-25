DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB; 

USE employee_trackerDB; 

-- department table -- 
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(30) NOT NULL
);
-- role table --
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL, 
    salary DECIMAL, 
    department_id INT, 
    FOREIGN KEY (deparyment_id) REFERENCES departement(id)
);
-- employee table --
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    role_id INT, 
    manager_id INT, 
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- department seeds -- 
INSERT INTO department (name) 
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Marketing");
INSERT INTO department (name)
VALUE ("Warehouse")

-- role seeds -- 
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Quoting", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Electrical Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Head of Marketing", 250000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Marketing Assistant", 190000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Hand", 190000, 5);
INSERT INTO role (title, salary, department_id)
VALUE ("General Labourer", 500000, 5);

-- EMPLOYEE SEEDS -------
-- EMPLOYEE SEEDS -------
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Devin", "Jones", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Ross", "Boot", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Somto","Nwobi",null,3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Shabir", "Gova", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Rajeev", "Nair", null, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Sapna", "Gova", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Sarah", "Vasconcelos", null, 7);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Wayne", "Bennet", null, 8);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jorge", "Vilchez", null, 9);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Bharat", "Tailor", null, 10);

-- SELECTING FOR CREATING 
--TABLES IN OUR SQL WORKBENCH 
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;