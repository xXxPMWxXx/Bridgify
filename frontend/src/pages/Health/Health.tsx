import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ResponsiveAppBar } from '../../Navbar';
import { Box, Typography } from '@mui/material';
import HealthTable from './HealthTable';

import { styled } from '@mui/system';
import backgroundImage from '../../images/background.png';
import ElderlyStatus from '../Home/elderlyStatus';

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
    console.log(token);
    console.log(userName);
    console.log(accRole);
    console.log(linkedElderly);
    console.log(profileImage);


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
                <Typography align="center" variant='h2' paragraph>
                    Health page under consturction,coming soon.
                </Typography>
            </Box>

            <HealthTable />

        </div>
    )
}