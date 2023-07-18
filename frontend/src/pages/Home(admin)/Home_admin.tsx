import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ResponsiveAppBarAdmin } from '../../Navbar';
import { Box, LinearProgress, Modal, Typography } from '@mui/material';
import MUIDataTable from "mui-datatables";


const delay = (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms)
);
export const Home_admin = () => {

    const token = window.localStorage.getItem('accessToken');
    const accRole = window.localStorage.getItem('accRole');
    //for datatable
    const columns = ["Name", "Email", "Account Role",
    {
        name: "linkedElderly",
        label: "Linked Elderly",
        options: {
          customBodyRender: (value:any) => {
            return (
              value == "" ? <Typography style={{ color: 'red' }}>Not link to any elderly yet</Typography> : value
            )
          }
        }
      }
    , "Date Created"];
    const [userData, setUserData]: any[] = useState([]);
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

    const loadUserData = async () => {
        // //calling backend API
        fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/user/getAll`, {
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
                    data.forEach((user: any) => {
                        const row = [user.name, user.email, user.accRole, user.linkedElderly.toString(), user.dateCreated]
                        userData.push(row)
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
        filterType: 'checkbox',
    };
    useEffect(() => {
        async function loadData() {
            setOpen(true);
            await delay(1000);
            loadUserData();
        }

        if (!dataLoaded) {
            loadData();
        }
    }, []);

    return (
        <div>
            {
                token == null ?
                    <Navigate to="/Login" /> : <Navigate to="/Home-admin" />
            }
            {
                token != null && accRole != 'Admin' ?
                    <Navigate to="/Forbidden" /> : null
            }
            < ResponsiveAppBarAdmin />
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
                        title={"User Accounts"}
                        data={userData}
                        columns={columns}
                    /> :

                    <Modal
                        keepMounted
                        open={open}
                        aria-labelledby="loading"
                        aria-describedby="loading user data"
                    >
                        <Box sx={style}>
                            <Typography id="loading" variant="h6" component="h2">
                                Loading user data, please wait.
                            </Typography>
                            <LinearProgress />
                        </Box>
                    </Modal>
                }
            </Box>

        </div>
    )
}

