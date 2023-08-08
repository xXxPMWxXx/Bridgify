import {
    Box, Typography, Modal,
    Grid, Button, TextField,Avatar, FormControl, 
     InputLabel, Select, MenuItem, InputAdornment, FormGroup, FormControlLabel, 
     Switch, OutlinedInput, Checkbox, ListItemText
} from '@mui/material';
import {TextareaAutosize} from '@mui/base/TextareaAutosize';
import React, { useEffect, useState } from 'react';
import { Sheet } from '@mui/joy';
import BasicDatePicker from './dateElement';
import dayjs, { Dayjs } from 'dayjs';

//for medication dropdown checkbox
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

//options for medication
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

export default function UpdateElderly(props: any) {
    const token = window.localStorage.getItem('accessToken');
    const [updateOpen, setUpdateOpen] = React.useState(true);
    const [elderly, Setelderly] = React.useState({ ...props.elderly });
    //to load the data
    const [elderlyID, setElderlyID] = useState(elderly[0]);
    const [elderlyName, setElderlyName] = useState(elderly[1]);
    const DOBArr = elderly[2].split('/');
    const [DOB, setDOB] = React.useState(dayjs(`${DOBArr[2]}-${DOBArr[1]}-${DOBArr[0]}`));
    const [dateCreated, setDateCreated] = useState(elderly[3]);
    const [currentActivity, setCurrentActivity] = useState(elderly[4]);
    const [medicationSelected, setMedication] = useState(elderly[5].split(','));
    const [temp, setTemp] = useState(elderly[6]);
    const [condition, setCondition] = useState(elderly[7]);
    const [conditionDescription, setConditionDescription] = useState(elderly[8]);
    const [awake, setAwake] = useState((String(elderly[9]).toLowerCase() === 'true'));
    const [takenMed, setTakenMed] = useState((String(elderly[10]).toLowerCase() === 'true'));
    const [elderlyPhoto, setElderlyPhoto] = useState(elderly[11].props.src);

    useEffect(() => {
    }, []);

    //for modal
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        overflow: 'scroll',
        boxShadow: 24,
        p: 4,
    };
    const handleUpdateClose = () => {
        setUpdateOpen(false);
        //to update parent element
        props.open(false);
    }

    const [name, setName] = useState(elderly[0]);
    //for update the input
    const handleName = (event: any) => {
        setElderlyName(event.target.value);
    };
    const handleDOB = (newDate: Dayjs | null) => {
        setDOB(dayjs(newDate));
    };
    const handleCurrentActivity = (event: any) => {
        setCurrentActivity(event.target.value);
    };
    const handleAwake = (event: any) => {
        if(awake === true) {
            setAwake(false);
        }else {
            setAwake(true);
        }
    };
    const handleTemp = (event: any) => {
        setTemp(event.target.value);
    };
    const handleCondition = (event: any) => {
        setCondition(event.target.value);
    };
    const handleConditionDescription = (event: any) => {
        setConditionDescription(event.target.value);
    };
    const handleElderlyID = (event: any) => {
        setElderlyID(event.target.value);
    };
    const handleMedication = (event: any) => {
        setMedication(event.target.value);
    };
    const handleMedTakenBool = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(takenMed === true) {
            setTakenMed(false);
        }else {
            setTakenMed(true);
        }
    };

    const handleUpdateSubmit = (event: any) => {
        event.preventDefault();
        // Make a POST request to the server with the formData
        fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/elderly/update`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            method: 'PUT',
            body: JSON.stringify({
                "id": elderlyID,
                "name": elderlyName,
                "DOB": DOB.format('DD/MM/YYYY'),
                "status": {
                    "current_activity": currentActivity,
                    "current_temp": temp,
                    "medication": medicationSelected,
                    "taken_med": String(takenMed).toUpperCase(),
                    "condition": condition,
                    "condition_description": conditionDescription,
                    "awake": String(awake).toUpperCase(),
                }
            })
        })
            .then(async (response) => {
                if (response.status != 200) {
                    const apiResponse = await response.json();
                    //pass to parent to show alert msg
                    props.setOpenSnackbar(true);
                    props.setAlertType('error');
                    props.setAlertMsg(apiResponse['message']);
                } else {
                    const apiResponse = await response.json();
                    //pass to parent to show alert msg
                    props.setOpenSnackbar(true);
                    props.setAlertType('success');
                    props.setAlertMsg(apiResponse['message']);
                    props.setReload(true);
                    setUpdateOpen(false);
                    // window.location.reload();
                }
            })
            .catch((error) => {
                // Handle any error that occurred during the update process
                window.alert(`Error during update post:${error}`);
            });


    }

    return (
        <Modal
            open={updateOpen}
            onClose={handleUpdateClose}
            aria-labelledby="updateelderly"
            aria-describedby="updateelderly"
            sx={{
                position: 'absolute',
                top: '8%',
                overflow: 'scroll',
                height: '100%',
                display: 'block'
            }}

        >
            <form onSubmit={handleUpdateSubmit}>
                <Box sx={{ ...style, width: 800, mt: 15 }} textAlign='center'>

                    <Avatar
                        src={elderlyPhoto}
                        style={{
                            width: "100px",
                            height: "100px",
                            margin: "auto",
                        }}
                    />
                    {/* personal information */}
                    <Sheet>
                        <Typography variant="h6" gutterBottom sx={{ marginBottom: 1 }}>
                            Personal Information
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    required
                                    id="fullName"
                                    name="fullName"
                                    label="Full name"
                                    fullWidth
                                    autoComplete="given-name"
                                    value={elderlyName}
                                    disabled
                                    onChange={handleName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    required
                                    id="elderlyID"
                                    name="elderlyID"
                                    label="Last 4 Digit of IC"
                                    fullWidth
                                    value={elderlyID}
                                    disabled
                                    onChange={handleElderlyID}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} sx={{ marginTop: 0 }} >

                                <BasicDatePicker onDateChange={handleDOB} value={DOB} resetValue={null} />

                            </Grid>
                        </Grid>
                    </Sheet>
                    {/* status */}
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
                                            value={currentActivity}
                                            label="Current Activity"
                                            onChange={handleCurrentActivity}
                                        >
                                            <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
                                            <MenuItem value={"Lunch"}>Lunch</MenuItem>
                                            <MenuItem value={"Dinner"}>Dinner</MenuItem>
                                            <MenuItem value={"Rest"}>Rest</MenuItem>
                                            <MenuItem value={"Outdoor Activity"}>Outdoor Activity</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={2.5}>
                                <TextField
                                    // required
                                    id="temperature"
                                    name="temperature"
                                    label="Current Temp"
                                    value={temp}
                                    onChange={handleTemp}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">°C</InputAdornment>,
                                    }} fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} sm={2}>
                                <FormGroup sx={{ paddingTop: 1 }}>
                                    <FormControlLabel control={<Switch checked={awake} onClick={handleAwake}/>} label="Awake" />
                                </FormGroup>
                            </Grid>

                        </Grid>
                    </Sheet>
                    {/* medication */}
                    <Sheet sx={{ marginTop: 2 }}>
                        <Typography variant="h6" gutterBottom sx={{ marginBottom: 2 }}>
                            Medication
                        </Typography>
                        <Grid container spacing={3}>

                            <Grid item xs={12} sm={9}>
                                <FormControl sx={{}} fullWidth>
                                    <InputLabel id="demo-multiple-checkbox-label">Meds</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={medicationSelected}
                                        onChange={handleMedication}
                                        input={<OutlinedInput label="Meds" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {medication.map((med: any) => (
                                            <MenuItem key={med} value={med}>
                                                <Checkbox checked={medicationSelected.indexOf(med) > -1} />
                                                <ListItemText primary={med} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <FormGroup sx={{ paddingTop: 1 }}>
                                    <FormControlLabel control={<Switch checked={takenMed} onChange={handleMedTakenBool} />} label="Med Taken" />                            </FormGroup>
                            </Grid></Grid>

                    </Sheet>
                    {/* condition */}
                    <Sheet sx={{ marginTop: 2, marginBottom: 3 }}>
                        <Typography variant="h6" gutterBottom sx={{ marginBottom: 1 }}>
                            Condition
                        </Typography>
                        <Grid container spacing={3}>

                            <Grid item xs={12} sm={4}>
                                <TextField
                                    // required
                                    id="condition"
                                    name="condition"
                                    label="Condition"
                                    value={condition}
                                    onChange={handleCondition}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <TextareaAutosize minRows="7" onChange={handleConditionDescription}
                                    style={{ width: "100%", fontSize: "inherit", font: "inherit", border: "1px solid light-grey", borderRadius: 4 }}
                                    id='Description' className='StyledTextarea' value={conditionDescription} placeholder="Condition Description" />
                            </Grid>

                        </Grid>
                    </Sheet>
                    {/* condition */}
                    <Sheet sx={{ alignItems: "center", mb: 10 }}>
                        <Button type='submit' fullWidth variant="contained" sx={{ p: 1.5, textTransform: "none", fontSize: "16px" }}>Update</Button>
                    </Sheet>
                </Box>
            </form>

        </Modal>
    )
}