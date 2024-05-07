import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

type RouteParams = {
    id: string
}
interface Department {
    id: number;
    departmentDescription: string;
    departmentName: string;
}



const DepartmentDeleteComponent: React.FC<{}> = () => {
    const { id } = useParams<RouteParams>();
    const [myDepartment, setMyDepartment] = useState<Department>();

    const fetchData = async () => {
        const response = await axios.get<Department>(
            "http://localhost:8080/api/departments/" + id
        );
        setMyDepartment(response.data);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const deleteData = async () => {
        const response = await axios.delete(
            "http://localhost:8080/api/departments/" + id
        );
        setMyDepartment(response.data);
        alert("data deleted");
    };

    return (
        <>
            <Container>
                <h1>Department Delete {id}</h1>
                <h4>Name: {myDepartment?.departmentName}</h4>
                <br />
                <h4>Description: {myDepartment?.departmentDescription}</h4>
                <br />
                <Button onClick={deleteData} variant="danger" type="button">Confirm Delete</Button>
            </Container>
        </>
    )

}

export default DepartmentDeleteComponent;