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

import com.gl.test.EmployeeProject.dto.DepartmentDto;
import com.gl.test.EmployeeProject.service.impl.DepartmentServiceImpl;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/departments")
public class DepartmentController {
	
	@Autowired
	private DepartmentServiceImpl departmentService;
	
	//Build create or add Department REST API
	@PostMapping
	public ResponseEntity<DepartmentDto> createDepartment(@RequestBody DepartmentDto departmentDto){
		DepartmentDto department = departmentService.createDepartment(departmentDto);
		return new ResponseEntity<DepartmentDto>(department,HttpStatus.CREATED);
	}
	
	//build get Department REST API
	@GetMapping("{id}")
	public ResponseEntity<DepartmentDto> getDepartmentById(@PathVariable("id") Long departmentId){
		DepartmentDto departmentDto = departmentService.getDepartmentById(departmentId);
		return ResponseEntity.ok(departmentDto);
	}
	
	//build get Department REST API
	@GetMapping
	public ResponseEntity<List<DepartmentDto>> getAllDepartment(){
		List<DepartmentDto> departments = departmentService.getAllDepartment();
		return ResponseEntity.ok(departments);
	}
	
	//build get Department REST API
	@PutMapping("{id}")
	public ResponseEntity<DepartmentDto> updateDepartment(@PathVariable("id") Long departmentId,@RequestBody DepartmentDto updateDepartment){
		DepartmentDto departmentDto = departmentService.updateDepartemnt(departmentId, updateDepartment);
		return ResponseEntity.ok(departmentDto);
	}
	
	//Build get Department REST API
	@DeleteMapping("{id}")
	public ResponseEntity<String> deleteDepartment(@PathVariable("id") Long departmentId){
		departmentService.deleteDepartment(departmentId);
		return ResponseEntity.ok("Department deleted Successfully");
	}
	
}
