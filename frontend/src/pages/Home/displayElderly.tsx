import {
    Box, Typography, Modal,
    Grid, TextField, Avatar, FormControl,
    InputLabel, Select, MenuItem, InputAdornment, FormGroup, FormControlLabel,
    Switch, OutlinedInput, Checkbox, ListItemText
} from '@mui/material';
import {TextareaAutosize} from '@mui/base/TextareaAutosize';
import React, { useState } from 'react';
import { Sheet } from '@mui/joy';
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

export default function DisplayElderly(props: any) {
    const [updateOpen, setUpdateOpen] = React.useState(true);
    const [elderly] = React.useState({ ...props.elderly });
    //to load the data
    const [elderlyID] = useState(elderly.id);
    const [elderlyName] = useState(elderly.name);
    const DOBArr = elderly.DOB.split('/');
    const [DOB] = React.useState(`${DOBArr[2]}-${DOBArr[1]}-${DOBArr[0]}`);
    const [currentActivity] = useState(elderly.status.current_activity);
    const [medicationSelected] = useState(elderly.status.medication);
    const [temp] = useState(elderly.status.current_temp);
    const [condition] = useState(elderly.status.condition);
    const [conditionDescription] = useState(elderly.status.condition_description);
    const [awake] = useState((String(elderly.status.awake).toLowerCase() === 'true'));
    const [takenMed] = useState((String(elderly.status.taken_med).toLowerCase() === 'true'));
    const [elderlyPhoto] = useState(elderly.photo);

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
        props.open(false);
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
            <Box sx={{ ...style, width: 800, mt: 10}} textAlign='center'>

                <Avatar
                    src={`${process.env.REACT_APP_BACKEND_IMAGES_URL}/trained_face/${elderlyPhoto}`}
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
                                id="fullName"
                                name="fullName"
                                label="Full name"
                                fullWidth
                                autoComplete="given-name"
                                value={elderlyName}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                id="elderlyID"
                                name="elderlyID"
                                label="Last 4 Digit of IC"
                                fullWidth
                                value={elderlyID}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} sx={{ marginTop: 0 }} >
                            <TextField
                                id="DOB"
                                name="DOB"
                                label="Date of Birth"
                                fullWidth
                                value={DOB}
                                disabled
                            />
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
                                        disabled
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={currentActivity}
                                        label="Current Activity"
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
                                disabled
                                id="temperature"
                                name="temperature"
                                label="Current Temp"
                                value={temp}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">°C</InputAdornment>,
                                }} fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={2}>
                            <FormGroup sx={{ paddingTop: 1 }}>
                                <FormControlLabel disabled control={<Switch checked={awake} />} label="Awake" />
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
                                    disabled
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={medicationSelected}

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
                                <FormControlLabel disabled control={<Switch checked={takenMed} />} label="Med Taken" />                            </FormGroup>
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
                                disabled
                                id="condition"
                                name="condition"
                                label="Condition"
                                value={condition}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} sx={{mb:10}}>
                            <TextareaAutosize disabled minRows="7"
                                style={{ width: "100%", fontSize: "inherit", font: "inherit", border: "1px solid light-grey", borderRadius: 4 }}
                                id='Description' className='StyledTextarea' value={conditionDescription} placeholder="Condition Description" />
                        </Grid>

                    </Grid>
                </Sheet>
            </Box>
        </Modal>
    )
}