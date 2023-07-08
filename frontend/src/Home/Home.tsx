import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useEffect, useState } from 'react';

import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Navigate } from 'react-router-dom';
import { Layout } from '../Layout';

export const Home = () => {

    useEffect(() => {
    }, []);
    const token = window.localStorage.getItem('accessToken');
    console.log(token);

    return (
        <div>
            {
				token == null ?
					<Navigate to="/Login" /> : <Navigate to="/" />
			}
            <Layout/>
            <p>Home page</p>

        </div>
    )
}

