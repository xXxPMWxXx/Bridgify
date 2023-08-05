import './Post_admin.css';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ResponsiveAppBarAdmin } from '../../Navbar';
import {
    Box, Tab, Tabs, 
} from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import {CreatePostTab, PostTab} from './tabs'

const delay = (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms)
);

export const Post_admin = () => {

    const token = window.localStorage.getItem('accessToken');
    const accRole = window.localStorage.getItem('accRole');
    const [value, setValue] = React.useState('Post');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div>
            {
                token == null ?
                    <Navigate to="/Login" /> : <Navigate to="/Post-admin" />
            }
            {
                token != null && accRole != 'Admin' ?
                    <Navigate to="/Forbidden" /> : null
            }
            < ResponsiveAppBarAdmin />

            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} textColor="inherit" indicatorColor="primary" centered>
                            <Tab label="Post" value="Post" />
                            <Tab label="Create New Post" value="Create New Post" />
                        </Tabs>
                    </Box>

                    <TabPanel value="Post">
                        <br />
                        <br />
                        <PostTab />
                    </TabPanel>

                    <TabPanel value="Create New Post">
                        <CreatePostTab />
                    </TabPanel>
                </TabContext>
            </Box>

        </div>
    )
}