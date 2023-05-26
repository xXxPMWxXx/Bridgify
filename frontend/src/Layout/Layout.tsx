import './Layout.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useEffect, useState } from 'react';

import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';


export const Layout = () => {
    useEffect(() => {

    }, []);


    return (
        <div className="App">


            <Navbar bg="light" variant="light" fixed="top"  >
                <Container>
                    <Navbar.Brand href="/">DID</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/Home" >Home</Nav.Link>
                        <Nav.Link href="/Create#Create" >Create</Nav.Link>
                        <Nav.Link href="/GrantAccess#GrantAccess">Grant Access</Nav.Link>
                        <Nav.Link href="/View#View" >View</Nav.Link>
                        <NavDropdown title="History" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/AccessHistory">Access History</NavDropdown.Item>
                            <NavDropdown.Item href="/GrantedHistory">Granted History</NavDropdown.Item>

                        </NavDropdown>
                    </Nav>

                </Container>
            </Navbar>

        </div>
    )
}

