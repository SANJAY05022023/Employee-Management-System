package com.gl.test.EmployeeProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gl.test.EmployeeProject.entitys.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{

}
