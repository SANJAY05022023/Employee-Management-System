import React, { useState } from "react";
import axios from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";


interface Department {
    departmentDescription: string;
    departmentName: string;
}

const DepartmentAddComponent: React.FC<{}> = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const sendData = async () => {
        const newDepartment = {
            "departmentName": name,
            "departmentDescription": description
        };
        await axios.post("http://localhost:8080/api/departments", newDepartment);
    }

    return (
        <>
            <Container>
                <Row>
                    <Col md={12}>
                        <h2>AddDepartment</h2>
                    </Col>
                    <Col md={12}>
                        <Form onSubmit={sendData}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" onChange={(e) => setName(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" onChange={(e) => setDescription(e.target.value)}/>
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

export default DepartmentAddComponent;