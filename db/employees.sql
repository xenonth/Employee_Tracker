DATABASE employee-management IF NOT EXISTS 
CREATE DATABASE employee-management IF NOT EXISTS ,

CREATE TABLE department (
	id INT AUTO_INCREMENT NOT NULL ,
	name VARCHAR(30) NOT NULL ,
	PRIMARY KEY(id) ,
) ,

CREATE TABLE job-duty (
	id INT AUTO_INCREMENT NOT NULL ,
    title VARCHAR(30) NOT NULL ,
    salary DECIMAL(10,2) NOT NULL,
    department_id FOREIGN KEY (nameId) REFERENCES (department) NOT NULL ,
    PRIMARY KEY(id) ,
)

CREATE TABLE employee (
	id INT AUTO_INCREMENT NOT NULL ,
    first_name VARCHAR(30) NOT NULL ,
    last_name VARCHAR(30) NOT NULL ,
    role_id	FOREiGN KEY (job-dutyId) REFERENCES (job-duty)  NOT NULL ,
    PRIMARY KEY(id) 
)
 