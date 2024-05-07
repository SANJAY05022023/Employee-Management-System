import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

type Routeparams = {
    id: string;
}

interface Employee{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    departmentId: number;
    departmentName: string;
}

interface Department {
    id: number;
    departmentDescription: string;
    departmentName: string;
}

const EmployeeUpdateComponent: React.FC = () => {

    //reading the router param- url
    const { id } = useParams<Routeparams>();
    const [myEmployee, setMyEmployee] = useState<Employee>();
    const [departments, setDepartments] = useState<Department[]>([]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [departmentId, setDepartmentId] = useState(0);

    const fetchDataDepartment = async () => {
        const response = await axios.get<Department[]>("http://localhost:8080/api/departments");
        setDepartments(response.data);
    }

    const fetchDataEmployee = async () => {
        const response = await axios.get<Employee>("http://localhost:8080/api/employees/" + id);
        setMyEmployee(response.data);
        setFirstName(response.data[`firstName`]);
        setLastName(response.data[`lastName`]);
        setEmail(response.data[`email`]);
        setDepartmentId(response.data[`departmentId`]);
    }

    useEffect(() => {
        fetchDataDepartment();
        fetchDataEmployee()
    }, [])

    const sendData = async () => {
        const newEmployee = {
            "id": id,
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "departmentId": departmentId,
            "departmentName": "-"
        };
        await axios.put("http://localhost:8080/api/employees/" + id, newEmployee);
    }

    return (
        <>
            <Container>
                <Row>
                    <Col md={12}>

                    </Col>
                    <Col md={12}>
                        <Form onSubmit={sendData}>
                            <Form.Group className="mb-3">
                                <Form.Label>FirstName</Form.Label>
                                <Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>LastName</Form.Label>
                                <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label >Department</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={(e) => setDepartmentId(parseInt(e.target.value))} >
                                <option>Select Below</option>
                                    {
                                        departments.map( temp => {
                                            if (temp.id == myEmployee?.departmentId) {
                                                return (
                                                    <option selected value={temp.id}>{temp.departmentName}</option>
                                                )
                                            }
                                            else {
                                                return (
                                                    <option value={temp.id}>{temp.departmentName}</option>
                                                )
                                            }
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Button type="submit">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default EmployeeUpdateComponent;