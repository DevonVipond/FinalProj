import React, { Component } from 'react'
import {Navbar, Nav, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logout from "../../../UseCases/Logout/Logout";
import authService from "../../../UseCases/AuthService";

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
        if (!authService.isAuthenticated()) {
            return (
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/login">Ægir</Navbar.Brand>
                </Navbar>
            )
        }

        if (authService.getAuth()?.toUpperCase() === 'ADMIN') {
            return (
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/home">Ægir</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Button  variant='light' onClick={(event: any) => {
                                authService.removeAuth()
                                window.location.href='/login'
                            }}>Sign Out</Button>
                        </Nav>
                        <Navbar.Brand href="/home">Welcome {authService.getUsername()}</Navbar.Brand>
                    </Navbar.Collapse>
                </Navbar>
            )
        }

        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/home">Ægir</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/settings">Settings</Nav.Link>
                    <Button  variant='light' onClick={(event: any) => {
                        authService.removeAuth()
                        window.location.href='/login'
                    }}>Sign Out</Button>
                </Nav>
                <Navbar.Brand href="/home">Welcome {authService.getUsername()}</Navbar.Brand>
            </Navbar.Collapse>
            </Navbar>
        )
    }
}