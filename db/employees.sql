DROP DATABASE IF EXISTS employee_management; 

CREATE DATABASE IF NOT EXISTS employee_management; 

USE employee_management;


CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name_of_department VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE job_duty (
      id INT NOT NULL AUTO_INCREMENT,
      title VARCHAR(50) NOT NULL,
      salary decimal(10,2) NOT NULL,
      department_id INT NOT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (department_id) references department (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  job_duty_id   INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (job_duty_id) REFERENCES job_duty(id)
);
 USE employee_management;
 
INSERT department (name_of_department) values ("HQ");

INSERT job_duty (title, salary, department_id) values ( "CEO", 500000, 1);


INSERT INTO employee (first_name, last_name, job_duty_id) values ("Patrick", "Lavinski", 1) ;


