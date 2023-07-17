import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ResponsiveAppBarAdmin } from '../../Navbar';
import { Box, Typography } from '@mui/material';

export const Elderly_admin = () => {

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
                    <Navigate to="/Login" /> : <Navigate to="/Elderly-admin" />
            }
            {
                token != null && accRole != 'Admin' ?
                    <Navigate to="/Forbidden" /> : null
            }
            < ResponsiveAppBarAdmin />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',

                }}
            >
                <Typography align="center" variant='h2' paragraph>
                    Elderly(admin) page under construction,coming soon.
                </Typography>
            </Box>

        </div>
    )
}