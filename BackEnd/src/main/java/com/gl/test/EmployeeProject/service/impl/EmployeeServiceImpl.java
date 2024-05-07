package com.gl.test.EmployeeProject.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.gl.test.EmployeeProject.dto.EmployeeDto;
import com.gl.test.EmployeeProject.entitys.Department;
import com.gl.test.EmployeeProject.entitys.Employee;
import com.gl.test.EmployeeProject.mapper.EmployeeMapper;
import com.gl.test.EmployeeProject.repository.DepartmentRepository;
import com.gl.test.EmployeeProject.repository.EmployeeRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl {
	
	private EmployeeRepository employeeRepository;
	private DepartmentRepository departmentRepository;
	
	public EmployeeDto createEmployee(EmployeeDto employeeDto) {
		Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
		Optional<Department> opt = departmentRepository.findById(employeeDto.getDepartmentId());
		Department department = null;
		if( opt != null ) {
			department = opt.get();
		}
		employee.setDepartment(department);
		Employee savedEmployeeObj = employeeRepository.save(employee);
		return EmployeeMapper.mapToEmployeeDto(savedEmployeeObj);
	}
	
	public EmployeeDto getEmployeeById(Long employeeId) {
		Optional<Employee> opt = employeeRepository.findById(employeeId);
		if( opt.get() != null ) {
			Employee employee = opt.get();
			return EmployeeMapper.mapToEmployeeDto(employee);
		}
		return null;
	}
	
	public List<EmployeeDto> getAllEmployee(){
		List<Employee> employees = employeeRepository.findAll();
		return employees.stream().map((employee) ->
		EmployeeMapper.mapToEmployeeDto(employee)).collect(Collectors.toList());
	}
	
	public EmployeeDto updateEmployee(Long employeeId,EmployeeDto updatedEmployee) {
		Employee employee = null;
		Optional<Employee> opt = employeeRepository.findById(employeeId);
		if( opt != null ) {
			employee = opt.get();
		}
		employee.setFirstName(updatedEmployee.getFirstName());
		employee.setLastName(updatedEmployee.getLastName());
		employee.setEmail(updatedEmployee.getEmail());
		
		Optional<Department> optDepartment = departmentRepository.findById(updatedEmployee.getDepartmentId());
		Department department = null;
		if( opt != null ) {
			department = optDepartment.get();
		}
		employee.setDepartment(department);
		Employee updatEmployeeobj = employeeRepository.save(employee);
		return EmployeeMapper.mapToEmployeeDto(updatEmployeeobj);
	}
	
	public void deleteEmployee(Long employeeId) {
		employeeRepository.deleteById(employeeId);
	}
}
