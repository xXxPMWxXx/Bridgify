import React, { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress, Modal, Avatar, Grid, TextField, FormControlLabel, Checkbox, FormControl, InputLabel, MenuItem, Select, FormLabel, RadioGroup, Radio, Switch, FormGroup, Button, ListItemText, OutlinedInput, Snackbar, Alert, } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useNavigate } from 'react-router-dom';




import BasicDatePicker from './dateElement';

import MUIDataTable from "mui-datatables";
import { Sheet } from '@mui/joy';

export function ElderlyTab() {
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
                customBodyRender: (value: any) => {
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
            await delay(500);
            loadElderlyData();
        }

        if (!dataLoaded) {
            loadData();
        }
    }, []);
    return (
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const medication = [
    'Acetaminophen',
    'Ibuprofen',
    'Aspirin',
    'Omeprazole',
    'Simvastatin',
    'Metformin',
    'Albuterol',
    'Sertraline',
    'Amlodipine',
    'Levothyroxine',
    'Lisinopril',
    'Metoprolol',
];

export function CreateElderlyTab() {
    const [description, setDescription] = useState('');

    const [personName, setPersonName] = useState<string[]>([]);

    //error , warning , info , success
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertType, setAlertType]: any = useState('info');
    const [alertMsg, setAlertMsg] = useState('');



    let navigate = useNavigate();

    const handleChange = (event: any) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleDescription = (event: any) => {

        setDescription(event.target.value);
        console.log(description)
    };
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };
    const handleSubmit = (event: any) => {
        // if (false) {
        //     //show alert msg
        //     // setOpenSnackbar(true);
        //     setAlertType('error');
        //     // setAlertMsg(signupResponse['message']);
        // } else {
        //     // setOpenSnackbar(true);
        //     setAlertType('success');
        //     setAlertMsg(`Elderly created successfully! `);
        //     // setTimeout(() => {
        //     //   navigate('/login');
        //     // }, 2000);
        // }
        setOpenSnackbar(true);
        setAlertType('success');
        setAlertMsg(`Elderly created successfully! `);

    };
    return (
        <React.Fragment>
            <Box sx={{ p: 3, paddingTop: 1, width: "55%", margin: "auto", boxShadow: "2px", borderRadius: 10 }}>
                <Typography variant="h5" gutterBottom sx={{ marginBottom: 2, textAlign: "center" }}>
                    Insert Elderly
                </Typography>
                <Sheet>
                    <Typography variant="h6" gutterBottom sx={{ marginBottom: 1 }}>
                        Elderly Info
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="fullName"
                                name="fullName"
                                label="Full name"
                                fullWidth
                                autoComplete="given-name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                required
                                id="elderlyID"
                                name="elderlyID"
                                label="Last 4 Digit of IC"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} sx={{ alignSelf: "top" }} >

                            <BasicDatePicker />

                        </Grid>
                        {/*                         
                        <Grid item xs={12} sm={5}>
                            <TextField
                                required
                                id="city"
                                name="city"
                                label="City"
                                fullWidth
                                autoComplete="shipping address-level2"
                            />
                        </Grid> */}
                    </Grid>
                </Sheet>


                <Sheet sx={{ marginTop: 2 }}>
                    <Typography variant="h6" gutterBottom sx={{ marginBottom: 1 }}>
                        Status
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Current Activity</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={age}
                                        label="Current Activity"
                                    // onChange={handleChange}
                                    >
                                        <MenuItem value={"breakfast"}>Breakfast</MenuItem>
                                        <MenuItem value={"lunch"}>Lunch</MenuItem>
                                        <MenuItem value={"dinner"}>Dinner</MenuItem>
                                        <MenuItem value={"sleep"}>Sleep</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                required
                                id="temperature"
                                name="temperature"
                                label="Current Temp"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={2}>
                            <FormGroup sx={{ paddingTop: 1 }}>
                                <FormControlLabel control={<Switch defaultChecked />} label="Awake" />

                            </FormGroup>
                        </Grid>
                        {/* <Grid item xs={12} sm={5}>
                            <Box>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label" sx={{ p: 0 }}>Gender</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        defaultValue="female"
                                    >
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                                    </RadioGroup>

                                </FormControl>
                            </Box>
                        </Grid> */}

                        {/* <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                                label="Use this address for payment details"
                            />
                        </Grid> */}
                    </Grid>
                </Sheet>
                <Sheet sx={{ marginTop: 2 }}>
                    <Typography variant="h6" gutterBottom sx={{ marginBottom: 2 }}>
                        Medication
                    </Typography>
                    <Grid container spacing={3}>

                        <Grid item xs={12} sm={9}>
                            <FormControl sx={{}} fullWidth>
                                <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={personName}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Tag" />}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {medication.map((med) => (
                                        <MenuItem key={med} value={med}>
                                            <Checkbox checked={personName.indexOf(med) > -1} />
                                            {/* <Checkbox checked={personName.indexOf(name) > -1} /> */}
                                            <ListItemText primary={med} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl></Grid>
                        <Grid item xs={12} sm={3}>
                            <FormGroup sx={{ paddingTop: 1 }}>
                                <FormControlLabel control={<Switch defaultChecked />} label="Med Taken" />

                            </FormGroup>
                        </Grid></Grid>

                </Sheet>
                <Sheet sx={{ marginTop: 2, marginBottom: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ marginBottom: 1 }}>
                        Condition
                    </Typography>
                    <Grid container spacing={3}>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                id="condition"
                                name="condition"
                                label="Condition"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextareaAutosize minRows="7" onChange={handleDescription} style={{ width: "100%", fontSize: "inherit", font: "inherit", border: "1px solid light-grey", borderRadius: 4 }} id='Description' className='StyledTextarea' value={description} placeholder="Condition Description" />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                                label="Use this address for payment details"
                            />
                        </Grid> */}
                    </Grid>
                </Sheet>

                <Sheet sx={{ alignItems: "center" }}>
                    <Button fullWidth variant="contained" onClick={handleSubmit} sx={{ p: 1.5, textTransform: "none", fontSize: "16px" }}>Insert Elderly</Button>
                </Sheet>
                <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleSnackbarClose}>
                    <Alert onClose={handleSnackbarClose} severity={alertType} sx={{ width: '100%' }}>
                        {alertMsg}
                    </Alert>
                </Snackbar>

            </Box>

        </React.Fragment>)
}