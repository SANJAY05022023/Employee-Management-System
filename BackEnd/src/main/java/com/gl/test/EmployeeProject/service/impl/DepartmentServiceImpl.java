package com.gl.test.EmployeeProject.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.gl.test.EmployeeProject.dto.DepartmentDto;
import com.gl.test.EmployeeProject.entitys.Department;
import com.gl.test.EmployeeProject.mapper.DepartmentMapper;
import com.gl.test.EmployeeProject.repository.DepartmentRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DepartmentServiceImpl {
	private DepartmentRepository departmentRepository;
	
	public DepartmentDto createDepartment(DepartmentDto departmentDto) {
		Department department = DepartmentMapper.mapToDepartment(departmentDto);
		Department SaveDepartment = departmentRepository.save(department);
		return DepartmentMapper.mapToDepartmentDto(SaveDepartment);
	}
	
	public DepartmentDto getDepartmentById(Long departmentId) {
		Optional<Department> opt = departmentRepository.findById(departmentId);
		if( opt.get() != null ) {
			Department department = opt.get();
			return DepartmentMapper.mapToDepartmentDto(department);
		}
		return null;
	}
	
	public List<DepartmentDto> getAllDepartment(){
		List<Department> departments = departmentRepository.findAll();
		return departments.stream().map((department) ->
		DepartmentMapper.mapToDepartmentDto(department)).collect(Collectors.toList());
	}
	
	public DepartmentDto updateDepartemnt(Long departmentId,DepartmentDto updatedDepartment) {
		Optional<Department> opt = departmentRepository.findById(departmentId);
		
		Department department = null;
		if( opt.get() != null ) {
			department = opt.get();
			department.setDepartmentName(updatedDepartment.getDepartmentName());
			department.setDepartmentDescription(updatedDepartment.getDepartmentDescription());
			Department saveDepartment = departmentRepository.save(department);
			
			return DepartmentMapper.mapToDepartmentDto(saveDepartment);
		}
		return null;
	}
	
	public void deleteDepartment(Long departmentId) {
		departmentRepository.deleteById(departmentId);
	}
}
