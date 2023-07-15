import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ResponsiveAppBar } from '../../Navbar';
import { styled } from '@mui/material/styles';
import { Alert, Avatar, Box, Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Snackbar, TextField, Typography } from '@mui/material';


export const Profile = () => {
    useEffect(() => {
        setLinkedElderly(window.localStorage.getItem('linkedElderly'));
    }, []);

    const [linkedElderly, setLinkedElderly] : any = useState('');
    //error , warning , info , success
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertType, setAlertType]: any = useState('info');
    const [alertMsg, setAlertMsg] = useState('');
    const [elderlyID, setElderlyID] = useState('');
    const [mode, setMode] = useState('Add');
    
    const token = window.localStorage.getItem('accessToken');
    const userName = window.localStorage.getItem('userName');
    const accRole = window.localStorage.getItem('accRole');
    const profileImage = window.localStorage.getItem('profileImage')
    const email = window.localStorage.getItem('email')

    
    const profileImageSrc = `http://13.229.138.25:8000/images/user_profile/${profileImage}`;


    const handleElderlyID = (e: any) => {
        setElderlyID(e.target.value);
    }
    const handleMode = (e: any) => {
        setMode(e.target.value);
    }

    const handlerSubmit = (event: any) => {
        event.preventDefault();
        var APIMethod = 'linkElderly';
        if (mode != 'Add') {
            APIMethod = 'remove-linkElderly';
        }
        // //calling backend API
        fetch(`${process.env.REACT_APP_BACKEND_DEV_URL}/user/${APIMethod}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            method: 'POST',
            body: JSON.stringify({
                "email": email,
                "elderlyID": elderlyID,
            })
        })
            .then(async (response) => {
                if (response.status != 200) {
                    const apiResponse = await response.json();
                    //show alert msg
                    setOpenSnackbar(true);
                    setAlertType('error');
                    setAlertMsg(apiResponse['message']);
                } else {
                    const apiResponse = await response.json();
                    setLinkedElderly(apiResponse['linkElderly'].toString());
                    localStorage.setItem('linkedElderly', apiResponse['linkElderly'].toString());
                    
                    //show alert msg
                    setOpenSnackbar(true);
                    setAlertType('success');
                    setAlertMsg(apiResponse['message']);
                }

            })
            .catch((err) => {
                window.alert(err);
            });
    
    }

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };
    return (
        <div>
            {
                token == null ?
                    <Navigate to="/Login" /> : <Navigate to="/Profile" />
            }
            < ResponsiveAppBar />
            <Grid
                container
                spacing={1}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '43vh', bgcolor: '#30685E' }}
            >
                <Avatar
                    alt="User Photo"
                    src={profileImageSrc}
                    sx={{ width: 70, height: 70 }}
                />
                <Box >
                    <p />
                    <Typography variant="h4" component="h1" sx={{ color: '#03a9f4' }} >
                        {userName}
                    </Typography>
                    <p />
                    <Typography variant="h6" sx={{ m: 1, color: '#00bcd4' }}>
                        Email : {email}
                        <br />
                        Account Role : {accRole}
                        <br />
                        Linked Elderly : {linkedElderly}
                    </Typography>
                </Box>
            </Grid>
            <Box >
                <Typography variant="h3" align="center" component="h1" sx={{ m: 2 }} >
                    Add/Remove Linked Elderly
                </Typography >
                <form onSubmit={handlerSubmit}>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <RadioGroup
                            row
                            defaultValue="Add"
                            onChange={handleMode}
                        >
                            <FormControlLabel value="Add" control={<Radio />} label="Add" />
                            <FormControlLabel value="Remove" control={<Radio />} label="Remove" />

                        </RadioGroup>
                        <TextField onChange={handleElderlyID} margin="normal" required autoFocus label="Elderly ID(last 4 digit of NRIC)" sx={{ width: 400 }} />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ width: 300, m: 2 }}
                        >
                            Submit
                        </Button>
                    </Box>

                    <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
                        <Alert onClose={handleSnackbarClose} severity={alertType} sx={{ width: '100%' }}>
                            {alertMsg}
                        </Alert>
                    </Snackbar>
                </form>
            </Box>



        </div>
    )
}