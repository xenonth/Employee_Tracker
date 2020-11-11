DROP DATABASE IF EXISTS employee_management; 

CREATE DATABASE IF NOT EXISTS employee_management; 

USE employee_management;


CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    PRIMARY KEY (id)
);
CREATE TABLE job_duty (
      id INT NOT NULL AUTO_INCREMENT,
      title VARCHAR(50),
      salary decimal(10,2),
      department_id INT,
      PRIMARY KEY (id),
      FOREIGN KEY (department_id) references department (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  role_id   INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES job_duty(id)
);
 USE employee_management;
 
INSERT department (name) values ("HQ");

INSERT job_duty (title, salary) values ( "CEO", 500000);


INSERT INTO employee (first_name, last_name) values ("Patrick", "Lavinski") ;


