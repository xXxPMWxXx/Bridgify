import './Layout.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useEffect, useState } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';


export const Layout = () => {
    return (
        <div>
            <Navbar bg="light" variant="light" fixed="top"  >
                <Container>
                    <Navbar.Brand href="/">DID</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/" >Home</Nav.Link>
                        <Nav.Link href="/Create" >Create</Nav.Link>
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

export const DefaultNavbar = () => {

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <div className="container-fluid">

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <a className="navbar-brand mt-2 mt-lg-0" href="#">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                                height="15"
                                alt="MDB Logo"
                                loading="lazy"
                            />
                        </a>

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Dashboard</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Team</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Projects</a>
                            </li>
                        </ul>

                    </div>


                    <div className="d-flex align-items-center">

                        <div className="dropdown">
                            <a
                                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                                href="#"
                                id="navbarDropdownMenuAvatar"
                                role="button"
                                data-mdb-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                    className="rounded-circle"
                                    height="25"
                                    alt="Black and White Portrait of a Man"
                                    loading="lazy"
                                />
                            </a>
                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="navbarDropdownMenuAvatar"
                                onClick={() => console.log("work work")}
                            >
                                <li>
                                    <a className="dropdown-item" href="#">My profile</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Settings</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

            </nav>

        </div>
    )
}

