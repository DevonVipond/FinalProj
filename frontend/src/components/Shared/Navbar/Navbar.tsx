import React, { Component } from 'react'
import { Navbar, Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logout from "../../../UseCases/Logout/Logout";

const logout = () => {
    Logout()
        .then((e: any) => {
            console.log('Logout successful')
        })
        .catch((e: any) => {
            console.log('CustomNavbar -> ' + e.toString())
        })
}

export default class CustomNavbar extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/home">Ægir</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/settings">Settings</Nav.Link>
                    <Nav.Link onSelect={(e: any) => {logout()}}>Sign Out</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        )
    }
}