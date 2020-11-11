USE employee_management
DELIMITER //
-- ADD PROCEDURES FOR DATABASE

DELIMITER //


DELIMITER ;
-- VIEW PROCEDURES FOR DATABASE
DELIMITER //
CREATE PROCEDURE GetAllDepartments()
BEGIN
	SELECT *  FROM deparments;
END //

DELIMITER //
CREATE PROCEDURE GetAllEmployeeData()
BEGIN
	SELECT *  FROM employee;
END //
DELIMITER ; 

DELIMITER //
CREATE PROCEDURE GetEmployeeDuties()
BEGIN
	SELECT *  FROM job_duty;
END //
DELIMITER ;

CREATE PROCEDURE employeeJobDuty(first_name, last_name)
	
BEGIN
	SELECT first_name, last_name, FROM
FROM employee ,
END



