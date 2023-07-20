import React, { useEffect, useState } from 'react';

import { Box, Typography, LinearProgress, Modal, Avatar, } from '@mui/material';
import MUIDataTable from "mui-datatables";

export  function ElderlyTab() {
    const delay = (ms: number) => new Promise(
        resolve => setTimeout(resolve, ms)
    );
    const token = window.localStorage.getItem('accessToken');

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
    return(
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
    )
}

export  function CreateElderlyTab() {
    return (
        <p>Implement Insert Elderly</p>
    )
}