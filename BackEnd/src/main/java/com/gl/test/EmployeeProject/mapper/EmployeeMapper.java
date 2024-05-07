package com.gl.test.EmployeeProject.mapper;

import com.gl.test.EmployeeProject.dto.EmployeeDto;
import com.gl.test.EmployeeProject.entitys.Employee;

public class EmployeeMapper {
	public static EmployeeDto mapToEmployeeDto(Employee employee) {
		return new EmployeeDto(
				employee.getId(),
				employee.getFirstName(),
				employee.getLastName(),
				employee.getEmail(),
				employee.getDepartment().getId(),
				employee.getDepartment().getDepartmentName()				);
	}
	
	public static Employee mapToEmployee(EmployeeDto employeeDto) {
		Employee employee = new Employee();
		employee.setId(employeeDto.getId());
		employee.setFirstName(employeeDto.getFirstName());
		employee.setLastName(employeeDto.getLastName());
		employee.setEmail(employeeDto.getEmail());
		return employee;
	}
}
