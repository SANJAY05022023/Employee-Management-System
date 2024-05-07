package com.gl.test.EmployeeProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gl.test.EmployeeProject.entitys.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long>{

}
