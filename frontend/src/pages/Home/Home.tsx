import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useEffect, useState } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Navigate } from 'react-router-dom';
import { Layout, DefaultNavbar } from '../../Layout';
import {ResponsiveAppBar} from '../../Navbar';
import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import backgroundImage from '../../images/background.png';

const Background = styled("div") ({
    position: 'absolute', 
    width: '100%', 
    height: '45%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat'
})

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
           
            <Background />

            <div style={{display:'flex', justifyContent:'center'}}>
                <Typography component="h1" align="center" sx={{color:'white', position:'absolute', fontFamily:'Roboto', fontWeight:500, fontSize:45, marginTop:5}}>
                        Welcome!
                </Typography>
            </div>

            <div style={{alignItems: 'center'}}>
                
            </div>

        </div>
    )
}

