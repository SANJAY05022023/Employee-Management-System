import axios from "axios";
import React,{Component, useEffect, useState} from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

type RouteParams = {
    id: string
}

interface Employee{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    departmentId: number;
    departmentName: string;
}

const EmployeeDeleteComponent:React.FC<{}> = () =>{
    const { id } = useParams<RouteParams>();
    const [employee, setEmployee] = useState<Employee>();

    const nav = useNavigate();

    const fetchData = async () => {
        const response = await axios.get<Employee>(
            "http://localhost:8080/api/employees/" + id
        );
        setEmployee(response.data);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const deleteData = async () => {
        const response = await axios.delete(
            "http://localhost:8080/api/employees/" + id
        );
        if( response.status == 200 ){
            setEmployee(response.data);
            alert("data deleted");
        }else{
            alert("Some error happend")
        }
        nav("/employeelist");
    };

        return(
            <>
                 <Container>
                <h1>Employee Delete {id}</h1>
                <h4>Full Name: {employee?.firstName + " " + employee?.lastName}</h4>
                <br />
                <h4>Email: {employee?.email}</h4>
                <br />
                <h4>Department: {employee?.departmentName}</h4>
                <Button onClick={deleteData} variant="danger" type="button">Confirm Delete</Button>
            </Container>
            </>
        )

}

export default EmployeeDeleteComponent;