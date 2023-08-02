import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ResponsiveAppBar } from '../../Navbar';
import { styled } from '@mui/material/styles';
import { Alert, Avatar, Box, Button, FormControl, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Snackbar, TextField, Typography } from '@mui/material';
import Table from '@mui/joy/Table';
import { Sheet } from '@mui/joy';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import LinkIcon from '@mui/icons-material/Link';

const imageBASEURL = `${process.env.REACT_APP_BACKEND_IMAGES_URL}/trained_face`;



export const Profile = () => {
    useEffect(() => {
        setLinkedElderly(window.localStorage.getItem('linkedElderly'));
    }, []);

    const [linkedElderly, setLinkedElderly]: any = useState('');
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

    const profileImageSrc = `${process.env.REACT_APP_BACKEND_IMAGES_URL}/user_profile/${profileImage}`;

    const [linkedElderlyData, setLinkedElderlyData] = React.useState<any[]>([]);

    //retrieve linked elderly informatino
    const elderlyFetcher = async () => {
        console.log("elderlyFetcher called");

        try {
            const token = window.localStorage.getItem('accessToken');
            const response = await fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/elderly/getByUser/?email=${email}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                method: 'GET'
            });

            if (response.status !== 200) {
                console.log("error fetching data");
                return null;
            } else {
                console.log("loaded");
                const data = await response.json();
                setLinkedElderlyData(data);

            }
        } catch (err) {
            window.alert(err);
            return null;
        }
    };


    const handleElderlyID = (e: any) => {
        setElderlyID(e.target.value);
    }
    const handleMode = (e: any) => {
        setMode(e.target.value);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        var APIMethod = 'linkElderly';
        if (mode != 'Add') {
            APIMethod = 'remove-linkElderly';
        }
        // //calling backend API
        fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/user/${APIMethod}`, {
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

    const handleRemove = (removeID: any) => {
        // event.preventDefault();

        // //calling backend API
        fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/user/remove-linkElderly`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            method: 'POST',
            body: JSON.stringify({
                "email": email,
                "elderlyID": removeID,
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

    useEffect(() => {
        elderlyFetcher()
    }, [linkedElderly])
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
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '24vh', bgcolor: '#30685E' }}
            >
                <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    sx={{ width: "auto" }}

                >
                    <Avatar
                        alt="User Photo"
                        src={profileImageSrc}
                        sx={{ width: 100, height: 100, marginRight: 3 }}
                    />
                    <Typography variant="h5" component="h1" sx={{ color: 'white' }} >
                        User: {userName} <br />
                        Email: {email}<br />
                        Account Role: {accRole}<br />
                    </Typography>
                </Grid>
                {/* <Avatar
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
                </Box> */}
            </Grid>
            <Box >

                <Box sx={{
                    width: 500, margin: "auto",
                    alignContent: "center",
                    marginTop:2
                }}><Sheet>
                    {/* <Typography variant="h4" alignContent="center" component="h1" sx={{ m: 2, display:"inline-block"  }} >
                        Linked Elderly
                    </Typography > */}
                    <Button
                        startIcon={<LinkIcon />}
                        disabled={false}
                        size="small"
                        variant="outlined"
                        sx={{
                            borderWidth: "2px",
                            borderColor: "#30685e",
                            backgroundColor: "white",
                            color: "#30685e",
                            ":hover": {
                                bgcolor: "#224942",
                                color: "white"
                            }, marginBottom: 2, clear: "left",
                            float: "right"
                        }}> Link Elderly</Button>
</Sheet>
                    <Sheet
                        className="HealthTableContainer"
                        variant="outlined"
                        sx={{
                            width: 500,
                            borderRadius: 'md',
                            flex: 1,
                            overflow: 'auto',

                        }}
                    >


                        <Table
                            aria-labelledby="tableTitle"
                            stickyHeader
                            hoverRow
                            sx={{
                                '--TableCell-headBackground': (theme: { vars: { palette: { background: { level1: any; }; }; }; }) =>
                                    theme.vars.palette.background.level1,
                                '--Table-headerUnderlineThickness': '1px',
                                '--TableRow-hoverBackground': (theme: { vars: { palette: { background: { level1: any; }; }; }; }) =>
                                    theme.vars.palette.background.level1,
                            }}
                        >
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

                            </Box>
                            <thead >
                                <tr style={{}}>

                                    <th style={{ padding: 12, backgroundColor: "white", width: "20%" }}>ID</th>
                                    <th style={{ padding: 12, backgroundColor: "white", width: "40%" }}>Name</th>
                                    <th style={{ padding: 12, backgroundColor: "white", width: "25%" }}>Date of Birth</th>
                                    <th style={{ padding: 12, backgroundColor: "white", width: "15%" }}></th>

                                </tr>
                            </thead>
                            <tbody>
                                {linkedElderlyData.map((row) => (

                                    <tr key={row.id} >
                                        <td style={{ padding: 12, width: "5%" }}>{row.id}</td>
                                        <td >
                                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                                <Avatar alt={row.elderlyName} src={`${imageBASEURL}/${row.photo}`} />
                                                <Typography sx={{ font: "inherit" }}>
                                                    {row.name}
                                                </Typography>
                                            </Box>
                                        </td>
                                        <td style={{ padding: 12 }}>{row.DOB}</td>

                                        <td style={{
                                            width: "5%",


                                        }}>
                                            <IconButton aria-label="unlink" onClick={() => handleRemove(row.id)}>
                                                <LinkOffIcon /></IconButton>
                                        </td>
                                    </tr>
                                ))}


                            </tbody>
                        </Table></Sheet></Box>
                {/* {rows.length > 0 ? <Typography></Typography> : <Box textAlign={'center'} sx={{ p: 5 }} fontSize={"24px"}>No Records Found...</Box>} */}


                <form onSubmit={handleSubmit}>
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