import axios from "axios";
import React,{Component, useEffect, useState} from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Employee{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    departmentId: number;
    departmentName: string;
}

const EmployeeListComponent: React.FC = () =>{

    const [employees, setEmployee] = useState<Employee[]>([]);

    const fetchData = async () => {
        const response = await axios.get<Employee[]>(
            "http://localhost:8080/api/employees"
        );
        setEmployee(response.data);
    }

    useEffect(() => {
        fetchData();
    }, [])

        return(
            <>
                <Container>
                <Row>
                    <Col md={12}>
                    <h2>DepartmentListComponent</h2>
                    </Col>
                    <Col md={12}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Full Name </th>
                                    <th>Email</th>
                                    <th>Department</th>
                                    <th>Action 1</th>
                                    <th>Action 2</th>
                                </tr>
                            </thead>
                            <tbody>
                               {
                                employees.map( temp => (
                                    <tr key={temp.id}>
                                        <td>{temp.firstName +" "+ temp.lastName}</td>
                                        <td>{temp.email}</td>
                                        <td>{temp.departmentName}</td>
                                        <td>
                                            <Link className="btn btn-info" to={`/employeeupdate/${temp.id}`}>Update</Link>
                                        </td>
                                        <td>
                                            <Link className="btn btn-danger" to={`/employeedelete/${temp.id}`}>Delete</Link>
                                        </td>
                                    </tr>
                                ))
                               } 
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            </>
        )
}

export default EmployeeListComponent;