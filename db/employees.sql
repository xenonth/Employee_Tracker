DROP DATABASE IF EXISTS employee_management; 

CREATE DATABASE IF NOT EXISTS employee_management; 

USE employee_management;


CREATE TABLE department (
    department_id INT NOT NULL AUTO_INCREMENT,
    name_of_department VARCHAR(50) NOT NULL,
    PRIMARY KEY (department_id)
);
CREATE TABLE job_duty (
      job_duty_id INT NOT NULL AUTO_INCREMENT,
      title VARCHAR(50) NOT NULL,
      salary decimal(10,2) NOT NULL,
      department_id INT NOT NULL,
      PRIMARY KEY (job_duty_id),
      FOREIGN KEY (department_id) references department (department_id)
);

CREATE TABLE employee (
  employee_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  job_duty_id   INT NOT NULL,
  PRIMARY KEY (employee_id),
  FOREIGN KEY (job_duty_id) REFERENCES job_duty(job_duty_id)
);
 USE employee_management;
 INSERT INTO department (name_of_department) values ("logistics");
 INSERT INTO job_duty (title, salary, department_id) values ("Human Resources Manager", 250000, 1);
 INSERT INTO employee (first_name, last_name, job_duty_id) values ("Karen", "Schneider", 1);
 
SELECT * FROM employee INNER JOIN job_duty on employee.employee_id = job_duty.job_duty_id; 
UPDATE employee INNER JOIN job_duty SET title = "CEO" WHERE job_duty.job_duty_id = 1; 
SELECT * FROM job_duty INNER JOIN department on  job_duty.job_duty_id = department.department_id;

SELECT * FROM DEPARTMENT


