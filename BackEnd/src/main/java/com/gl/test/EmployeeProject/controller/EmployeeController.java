package com.gl.test.EmployeeProject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gl.test.EmployeeProject.dto.EmployeeDto;
import com.gl.test.EmployeeProject.service.impl.EmployeeServiceImpl;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
	
	@Autowired
	private EmployeeServiceImpl employeeService;
	
	@PostMapping 
	public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
		EmployeeDto employee = employeeService.createEmployee(employeeDto);
		return new ResponseEntity<EmployeeDto>(employee,HttpStatus.CREATED);
	}
	
	@GetMapping("{id}")
	public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long employeeId){
		EmployeeDto employeeDto = employeeService.getEmployeeById(employeeId);
		return ResponseEntity.ok(employeeDto);
	}
	
	@GetMapping
	public ResponseEntity<List<EmployeeDto>> getAllEmployee(){
		List<EmployeeDto> employees = employeeService.getAllEmployee();
		return ResponseEntity.ok(employees);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId,@RequestBody EmployeeDto updateEmployee){
		EmployeeDto employeeDto = employeeService.updateEmployee(employeeId, updateEmployee);
		return ResponseEntity.ok(employeeDto);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId){
		employeeService.deleteEmployee(employeeId);
		return ResponseEntity.ok("Department deleted Successfully");
	}

}
