import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ResponsiveAppBarAdmin } from '../../Navbar';
import { Box, Tab, Tabs} from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import {RecordTab, CreateRecordTab} from './tabs';



export const Record_admin = () => {

    const token = window.localStorage.getItem('accessToken');
    const accRole = window.localStorage.getItem('accRole');

    const [value, setValue] = React.useState('Records');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div>
            {
                token == null ?
                    <Navigate to="/Login" /> : <Navigate to="/Record-admin" />
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
                            <Tab label="Records" value="Records" />
                            <Tab label="Insert Record" value="Insert Record" />
                        </Tabs>
                    </Box>

                    <TabPanel value="Records">
                        <br />
                        <br />
                        <RecordTab />
                    </TabPanel>

                    <TabPanel value="Insert Record">
                        <CreateRecordTab />
                    </TabPanel>
                </TabContext>
            </Box>

        </div>
    )
}