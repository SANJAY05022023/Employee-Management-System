import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

//get list of existing department
interface Department {
    id: number;
    departmentDescription: string;
    departmentName: string;
}

const EmployeeAddComponent: React.FC = () => {

    //reading the router parm - url
    const [departments, setDepartment] = useState<Department[]>([]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [departmentId, setDepartmentId] = useState(0);

    const nav = useNavigate();

    const fetchDataDepartment = async () => {
        const response = await axios.get<Department[]>("http://localhost:8080/api/departments");
        setDepartment(response.data);
    }

    useEffect(() => {
        fetchDataDepartment();
    }, [])

    //e : the event that trigger this function - submit event
    const sendData = async (e: React.FormEvent) => {
        e.preventDefault();
        if (departmentId == 0) {
            alert("please select a department");
            return false;
        }
        const newEmployee = {
            "id": 0,
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "departmentId": departmentId,
            "departmentName": "-"
        };
        await axios.post("http://localhost:8080/api/employees", newEmployee);
        alert("Employee Added");
        nav("/employeelist");
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
                                    <Form.Control type="text" onChange={(e) => setFirstName(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>LastName</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setLastName(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setEmail(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label >Department</Form.Label>
                                    <Form.Select aria-label="Default select example"  onChange={(e) => setDepartmentId(parseInt(e.target.value))} >
                                        <option>Select Below</option>
                                        {
                                            departments.map(temp => (
                                                <option value={temp.id}>{temp.departmentName}</option>
                                            ))
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

export default EmployeeAddComponent;