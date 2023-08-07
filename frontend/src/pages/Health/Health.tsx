import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ResponsiveAppBar } from '../../Navbar';
import { Box } from '@mui/material';
import HealthTable from './HealthTable';
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



export const Health = () => {

    useEffect(() => {
    }, []);
    const token = window.localStorage.getItem('accessToken');
    const userName = window.localStorage.getItem('userName');
    const accRole = window.localStorage.getItem('accRole');
    const linkedElderly = window.localStorage.getItem('linkedElderly');
    const profileImage = window.localStorage.getItem('proofileImage')

    return (
        <div>
            {
                token == null ?
                    <Navigate to="/Login" /> : <Navigate to="/Health" />
            }
            < ResponsiveAppBar />
            {/* <Background/> */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
            </Box>

            <HealthTable />

        </div>
    )
}