import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ResponsiveAppBar } from '../../Navbar';
import { Alert, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Snackbar, TextField, Typography } from '@mui/material';
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

    const token = window.localStorage.getItem('accessToken');
    const userName = window.localStorage.getItem('userName');
    const accRole = window.localStorage.getItem('accRole');
    const profileImage = window.localStorage.getItem('profileImage')
    const email = window.localStorage.getItem('email')

    const profileImageSrc = `${process.env.REACT_APP_BACKEND_IMAGES_URL}/user_profile/${profileImage}`;

    //dialog
    const [open, setOpen] = React.useState(false);


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

                //if it is empty, set to empty array
                if (data['message'] != null) {
                    setLinkedElderlyData([]);
                }

            }
        } catch (err) {
            window.alert(err);
            return null;
        }
    };
    console.log(linkedElderlyData);
    console.log(linkedElderlyData.length);

    const handleElderlyID = (e: any) => {
        setElderlyID(e.target.value.toUpperCase());
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        var APIMethod = 'linkElderly';

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

                    handleClose();

                }

            })
            .catch((err) => {
                window.alert(err);
            });

    }

    const handleRemove = (removeID: any) => {
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
            <Grid container sx={{ justifyContent: "center", marginTop: "5%" }}>
                <Grid item xs={4} sx={{
                    justifyContent: "center", alignItems: "center", p: 2,
                    width: "auto", height: 500, marginRight: 5, bgcolor: "#30685E", borderRadius: 5
                }}>
                    <Avatar
                        alt="User Photo"
                        src={profileImageSrc}
                        sx={{ width: 200, height: 200, margin: "auto", marginTop: 5 }}
                    />
                    <div style={{ color: "white", marginTop: 15, paddingLeft: "10%", width: "auto" }}>
                        <Typography variant='h4' lineHeight={1.5}> Profile</Typography>

                        <Typography variant="h5" lineHeight={1.5} >
                            User: {userName} <br />
                            Email: {email}<br />
                            Account Role: {accRole}<br />
                        </Typography></div>
                </Grid>
                <Grid item>

                    <Box sx={{
                        width: 500, margin: "auto",
                        alignContent: "center",
                    }}><Sheet>
                            <Button
                                startIcon={<LinkIcon />}
                                disabled={false}
                                onClick={handleClickOpen}
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
                                    }, marginBottom: 2,
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
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} />
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

                            </Table>
                            {linkedElderlyData.length > 0 ? <Typography></Typography> : <Box textAlign={'center'} sx={{ p: 5, paddingTop: 20, paddingBottom: 20 }} fontSize={"24px"}>No Linked Elderly...</Box>}

                        </Sheet>
                    </Box></Grid>

            </Grid>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Link Elderly</DialogTitle>
                <DialogContent>


                    <TextField onChange={handleElderlyID} required label="Elderly ID (Last 4 digit of NRIC)" variant="outlined" sx={{ width: 300, marginTop: 1 }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" onClick={handleSubmit}>Link</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={alertType} sx={{ width: '100%' }}>
                    {alertMsg}
                </Alert>
            </Snackbar>
        </div >
    )
}