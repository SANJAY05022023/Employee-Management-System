import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeComponent from './Components/HomeComponent';
import DepartmentAddComponent from './Components/DepartmentAddComponent';
import DepartmentListComponent from './Components/DepartmentListComponent';
import DepartmentUpdateComponent from './Components/DepartmentUpdateComponent';
import DepartmentDeleteComponent from './Components/DepartmentDeleteComponent';
import EmployeeAddComponent from './Components/EmployeeAddComponent';
import EmployeeListComponent from './Components/EmployeeListComponent';
import EmployeeUpdateComponent from './Components/EmployeeUpdateComponent';
import EmployeeDeleteComponent from './Components/EmployeeDeleteComponent';

function App() {
  return (
    <>

<Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">EMS React</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/departmentadd">Add Department</Nav.Link>
            <Nav.Link href="/departmentlist">List Department</Nav.Link>
            <Nav.Link href="/employeeadd">Add Employee</Nav.Link>
            <Nav.Link href="/employeelist">List Employee</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<HomeComponent></HomeComponent>}></Route>
          <Route path='/departmentadd' element={<DepartmentAddComponent />}></Route>
          <Route path='/departmentlist' element={<DepartmentListComponent />}></Route>
          <Route path='/departmentupdate/:id' element={<DepartmentUpdateComponent />}></Route>
          <Route path='/departmentdelete/:id' element={<DepartmentDeleteComponent />}></Route>

          <Route path='/' element={<HomeComponent></HomeComponent>}></Route>
          <Route path='/employeeadd' element={<EmployeeAddComponent />}></Route>
          <Route path='/employeelist' element={<EmployeeListComponent />}></Route>
          <Route path='/employeeupdate/:id' element={<EmployeeUpdateComponent />}></Route>
          <Route path='/employeedelete/:id' element={<EmployeeDeleteComponent />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
