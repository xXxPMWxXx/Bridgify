import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ResponsiveAppBarAdmin } from '../../Navbar';
import { Box, Typography, Tab, Tabs, LinearProgress, Modal, Avatar, } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import MUIDataTable from "mui-datatables";

const delay = (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms)
);

export const Post_admin = () => {

    const token = window.localStorage.getItem('accessToken');
    const accRole = window.localStorage.getItem('accRole');
    //for tab
    const [value, setValue] = React.useState('Post');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    //for datatable
    const columns = ["Author Email", "Activity Type", "Description", 
    {
        name: "elderlyInvolved",
        label: "Elderly Involved",
        options: {
          customBodyRender: (value:any) => {
            return (
              value == "" ? <Typography style={{ color: 'red' }}>No known elderly detected in the images</Typography> : value
            )
          }
        }
      }
    , "No of Images", "Date Created"];
    const [postData, setPostData]: any[] = useState([]);
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

    const loadPostData = async () => {
        // //calling backend API
        fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/post/getAll`, {
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
                    const res = await response.json();
                    const data = res.data;
                    data.forEach((post: any) => {
                        const row = [post.author_email, post.activity_type, post.description,
                        post.elderlyInvolved.toString(), post.imagesCount, post.dateTime]

                        postData.push(row)
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

    const options = {
        
    };
    useEffect(() => {
        async function loadData() {
            setOpen(true);
            await delay(1000);
            loadPostData();
        }

        if (!dataLoaded) {
            loadData();
        }
    }, []);


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
                                    data={postData}
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
                                            Loading post data, please wait.
                                        </Typography>
                                        <LinearProgress />
                                    </Box>
                                </Modal>
                            }
                        </Box>
                    </TabPanel>

                    <TabPanel value="Create New Post">
                        Implement create new post
                    </TabPanel>
                </TabContext>
            </Box>

        </div>
    )
}