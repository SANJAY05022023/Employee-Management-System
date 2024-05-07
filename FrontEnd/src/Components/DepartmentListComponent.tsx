import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Department {
    id: number;
    departmentDescription: string;
    departmentName: string;
}

const DepartmentListComponent: React.FC = () => {
    const [departments, setDepartments] = useState<Department[]>([]);

    const fetchData = async () => {
        const response = await axios.get<Department[]>(
            "http://localhost:8080/api/departments"
        );
        setDepartments(response.data);
        console.log(response.data)
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
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
                                    <th>DepartmentDescription </th>
                                    <th>DepartmentName</th>
                                    <th>Action 1</th>
                                    <th>Action 2</th>
                                </tr>
                            </thead>
                            <tbody>
                               {
                                departments.map( temp => (
                                    <tr key={temp.id}>
                                        <td>{temp.departmentName}</td>
                                        <td>{temp.departmentDescription}</td>
                                        <td>
                                            <Link className="btn btn-info" to={`/departmentupdate/${temp.id}`}>Update</Link>
                                        </td>
                                        <td>
                                            <Link className="btn btn-danger" to={`/departmentdelete/${temp.id}`}>Delete</Link>
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


export default DepartmentListComponent;