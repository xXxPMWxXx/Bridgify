import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ResponsiveAppBarAdmin } from '../../Navbar';
import { Box, Typography, Tab, Tabs, LinearProgress, Modal, Avatar, } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import MUIDataTable from "mui-datatables";

const delay = (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms)
);

export const Elderly_admin = () => {

    const token = window.localStorage.getItem('accessToken');
    const accRole = window.localStorage.getItem('accRole');

    const [value, setValue] = React.useState('Elderly List');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    //for datatable
    const columns = ["ID", "Name", "DOB", "Date Created", "Current Activity", 
    "Medication", "Temperature", "Condition", "Awake", "Taken Med", 
    {
        name: "elderlyPhoto",
        label: "Photo",
        options: {
          customBodyRender: (value:any) => {
            return (
              <Avatar variant="rounded" src={`${process.env.REACT_APP_BACKEND_IMAGES_URL}/trained_face/${value}`} >
              </Avatar>
            )
          }
        }
      }];

    const [elderlyData, setElderlyData]: any[] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    //for modal
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [open, setOpen] = React.useState(false);

    const loadElderlyData = async () => {
        // //calling backend API
        fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/elderly/getAll`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            method: 'GET',
        })
            .then(async (response) => {
                if (response.status != 200) {
                    window.alert("Something is wrong!");
                } else {
                    const data = await response.json();
                    data.forEach((elderly: any) => {
                        const status = elderly.status;
                        const row = [elderly.id, elderly.name, elderly.DOB, elderly.created,
                        status.current_activity, status.medication.toString(), status.current_temp, status.condition,
                        status.awake, status.taken_med, elderly.photo]
                        elderlyData.push(row)
                    });
                    setDataLoaded(true);
                    //close the modal
                    setOpen(false);
                }
            })
            .catch((err) => {
                window.alert(err);
            });
    }

     //to customise mui datatable
     const options = {
        
     };

    useEffect(() => {
        async function loadData() {
            setOpen(true);
            await delay(1000);
            loadElderlyData();
        }

        if (!dataLoaded) {
            loadData();
        }
    }, []);

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
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {dataLoaded ?

                                <MUIDataTable
                                    title={"Elderly Lists"}
                                    data={elderlyData}
                                    columns={columns}
                                    options={options}
                                /> :

                                <Modal
                                    keepMounted
                                    open={open}
                                    aria-labelledby="loading"
                                    aria-describedby="loading user data"
                                >
                                    <Box sx={style}>
                                        <Typography id="loading" variant="h6" component="h2">
                                            Loading elderly data, please wait.
                                        </Typography>
                                        <LinearProgress />
                                    </Box>
                                </Modal>
                            }
                        </Box>
                    </TabPanel>

                    <TabPanel value="Insert Elderly">
                        Implement Insert Elderly
                    </TabPanel>
                </TabContext>
            </Box>

        </div>
    )
}