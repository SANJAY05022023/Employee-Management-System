import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

interface Department {
    id: number;
    departmentDescription: string;
    departmentName: string;
}

type RouteParams = {
    id: string
}

const DepartmentUpdateComponent: React.FC = () => {

    const { id } = useParams<RouteParams>();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [myDepartment, setMyDepartment] = useState<Department>();

    const fetchData = async () => {
        const response = await axios.get<Department>(
            "http://localhost:8080/api/departments/" + id
        );
        setMyDepartment(response.data);
        setName(response.data[`departmentName`]);
        setDescription(response.data[`departmentDescription`]);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const sendData = async () => {
        const newDepaertment = {
            "departmentName": name,
            "departmentDescription": description
        };
        await axios.put("http://localhost:8080/api/departments/" + id, newDepaertment);
    }

    return (
        <>
            <Container>
                <Row>
                    <Col md={12}>
                        <h2>UpdateDepartment {id}</h2>
                    </Col>
                    <Col md={12}>
                        <Form onSubmit={sendData}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default DepartmentUpdateComponent;