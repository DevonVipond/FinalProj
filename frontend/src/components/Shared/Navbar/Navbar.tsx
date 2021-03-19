import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class CustomNavbar extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/home">Ægir</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/settings">Settings</Nav.Link>
                    <Nav.Link href="/login">Sign Out</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        )
    }
}