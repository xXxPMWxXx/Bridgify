import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useEffect, useState } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Navigate } from 'react-router-dom';
import { Layout, DefaultNavbar } from '../../Layout';
import {ResponsiveAppBar} from '../../Navbar';
import { Box, Typography } from '@mui/material';

export const Home = () => {

    useEffect(() => {
    }, []);
    const token = window.localStorage.getItem('accessToken');
    const userName = window.localStorage.getItem('userName');
    const accRole = window.localStorage.getItem('accRole');
    const linkedElderly : any = window.localStorage.getItem('linkedElderly');
    const profileImage = window.localStorage.getItem('profileImage')
    console.log("-----Home-----");
    console.log(token);
    console.log(userName);
    console.log(accRole);
    console.log(linkedElderly);
    console.log(profileImage);
    
    //change linkedElderly to Array
    if(linkedElderly != null){
        var elderlyArray = linkedElderly.split(",");
        console.log(elderlyArray[0])
    } else {
        console.log(linkedElderly[0]);
    }
    

    return (
        <div>
            {
				token == null ?
					<Navigate to="/Login" /> : <Navigate to="/" />
			}
            < ResponsiveAppBar/>
            {/* < Layout/> */}
            {/* < DefaultNavbar/> */}
           
            <Box sx={{ textAlign: 'center', alignItems: 'center' }}>
                <Typography align="center" variant='h2' paragraph>
                    Home page under consturction,coming soon.
                </Typography>
            </Box>

        </div>
    )
}

