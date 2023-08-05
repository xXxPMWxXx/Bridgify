import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ResponsiveAppBarAdmin } from '../../Navbar';
import { Box, Tab, Tabs} from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import {ElderlyTab, CreateElderlyTab} from './tabs';


export const Elderly_admin = () => {

    const token = window.localStorage.getItem('accessToken');
    const accRole = window.localStorage.getItem('accRole');

    const [value, setValue] = React.useState('Elderly List');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

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

            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} textColor="inherit" indicatorColor="primary" centered>
                            <Tab label="Elderly List" value="Elderly List" />
                            <Tab label="Insert Elderly" value="Insert Elderly" />
                        </Tabs>
                    </Box>

                    <TabPanel value="Elderly List">
                        <br />
                        <br />
                        <ElderlyTab />
                    </TabPanel>

                    <TabPanel value="Insert Elderly">
                        <CreateElderlyTab />
                    </TabPanel>
                </TabContext>
            </Box>

        </div>
    )
}