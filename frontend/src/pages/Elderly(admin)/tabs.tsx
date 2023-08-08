import React, { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress, Modal, Avatar, Grid, TextField, FormControlLabel, 
    Checkbox, FormControl, InputLabel, MenuItem, Select,
    Switch, FormGroup, Button, ListItemText, OutlinedInput, Snackbar, Alert, IconButton, InputAdornment, 
    Dialog, DialogActions, DialogTitle, DialogContentText, DialogContent, } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useNavigate } from 'react-router-dom';
import BasicDatePicker from './dateElement';
import MUIDataTable from "mui-datatables";
import { Sheet } from '@mui/joy';
import UpdateElderly from './updateElderly';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export function ElderlyTab() {
    const delay = (ms: number) => new Promise(
        resolve => setTimeout(resolve, ms)
    );
    const token = window.localStorage.getItem('accessToken');

    //for datatable
    const columns = ["ID", "Name", "DOB", "Date Created", "Current Activity",
        "Medication", "Temperature", "Condition", "Condition Description", "Awake", "Taken Med",
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
                    const fetchData: any = [];
                    data.forEach((elderly: any) => {
                        const status = elderly.status;
                        const row = [elderly.id, elderly.name, elderly.DOB, elderly.created,
                        status.current_activity, status.medication.toString(), status.current_temp, status.condition, status.condition_description,
                        String(status.awake).toUpperCase(), String(status.taken_med).toUpperCase(), elderly.photo]
                        fetchData.push(row)
                    });
                    setElderlyData(fetchData);
                    setDataLoaded(true);
                    //close the modal
                    setOpen(false);
                }
            })
            .catch((err) => {
                window.alert(err);
            });
    }
    //for reload
    const [reload, setReload] = useState(false);
    //for alert
    //error , warning , info , success
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertType, setAlertType]: any = useState('info');
    const [alertMsg, setAlertMsg] = useState('');
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };
    //For update elderly
    const [updateOpen, setUpdateOpen] = React.useState(false);
    const [elderly, Setelderly] = React.useState();
    const handleRowClick = (rowData: any, rowMeta: any) => {
        Setelderly(rowData);
        setUpdateOpen(true);
    };

    //for deletion
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const onRowsSelect = (curRowSelected: any, allRowsSelected: any) => {
        try {
            setSelectedRows(allRowsSelected);
        } catch (error) {
            window.alert(`Error during selecting post:${error}`);
        }
    }

    const handleClickDeleteIcon = () => {
        setOpenConfirmDialog(true);
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
    };

    const handleDelete = () => {
        // Implement  delete logic
        selectedRows.forEach((element: any) => {
            const dataIndex = element.dataIndex;
            const elderlyID = elderlyData[dataIndex][0];
            // call backend to del from database
            fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/elderly/delete/?id=${elderlyID}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                method: 'DELETE'
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
                        //show alert msg
                        setOpenSnackbar(true);
                        setAlertType('success');
                        setAlertMsg(apiResponse['message']);
                        setReload(true);
                    }
                })
                .catch((error) => {
                    // Handle any error that occurred during the update process
                    window.alert(`Error during deleting elderly:${error}`);
                });
        });
        // After the deletion is successful, close the dialog
        handleCloseConfirmDialog();
    };

    //to customise mui datatable
    const options = {
        print: true,
        download: true,
        rowHover: true,
        onRowsSelect: onRowsSelect,
        onRowClick: handleRowClick,
        onRowsDelete: handleClickDeleteIcon,
        downloadOptions: { filename: `Bridgify Elderly Data(${new Date().toDateString()}).csv`},
    };

    useEffect(() => {
        async function loadData() {
            setOpen(true);
            await delay(250);
            loadElderlyData();
        }
        if (!dataLoaded) {
            loadData();
        }
        //trigger whenever reload value changed
        if (reload) {
            //reload whenever openSnackbar was changed
            loadData();
            //need set this, if not cannot click open again
            setUpdateOpen(false);
            setReload(false);
        }
    }, [reload]);
    return (
        <Box
            sx={{
                justifyContent: 'center',
                alignItems: 'center',
                width:"100%",
                overflow:"auto",
                boxShadow:"5", 
                marginBottom:5
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
                    aria-describedby="loading elderly data"
                >
                    <Box sx={style}>
                        <Typography id="loading" variant="h6" component="h2">
                            Loading elderly data, please wait.
                        </Typography>
                        <LinearProgress />
                    </Box>
                </Modal>
            }
            {updateOpen ?
                <UpdateElderly open={setUpdateOpen} setReload={setReload} setOpenSnackbar={setOpenSnackbar} setAlertType={setAlertType} setAlertMsg={setAlertMsg} elderly={elderly} />
                : null}

            <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
                    <Button onClick={handleDelete} color="secondary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={alertType} sx={{ width: '100%' }}>
                    {alertMsg}
                </Alert>
            </Snackbar>
        </Box>
    )
}

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

export function CreateElderlyTab() {
    const [name, setName] = useState('');
    const [elderlyID, setElderlyID] = useState('');
    const [dateOfBirth, setDateOfBirth] = React.useState<Dayjs>(dayjs('1980-01-01'));

    const [activity, setActivity] = useState('');
    const [temp, setTemp] = useState('');
    const [awakeBool, setAwakeBool] = useState("True");

    const [medName, setMedName] = useState<string[]>([]);
    const [medTakenBool, setMedTakenBool] = useState("False");

    const [condition, setCondition] = useState('');
    const [condDescription, setCondDescription] = useState('');

    //file upload
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const [openProcessingModal, setOpenProcessingModal] = React.useState(false);



    //error , warning , info , success
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertType, setAlertType]: any = useState('info');
    const [alertMsg, setAlertMsg] = useState('');



    let navigate = useNavigate();

    //handle form inputs
    const handleFileChange = (event: any) => {
        // Get the selected files from the input

        if ((event.target.files)[0]) {
            const file = (event.target.files)[0];
            setSelectedPhoto(file);
            console.log(file)
        } else {
            // window.alert("No file selected")
        }

    };
    const handleName = (event: any) => {
        setName(event.target.value);
    };
    const handleElderlyID = (event: any) => {
        setElderlyID(event.target.value);
    };
    const handleDate = (newDate: Dayjs | null) => {

        setDateOfBirth(dayjs(newDate))

        console.log(newDate)
    };
    const handleTemp = (event: any) => {
        setTemp(event.target.value);
    };
    const handleActivity = (event: any) => {
        setActivity(event.target.value);
    };
    const handleAwakeBool = (event: any) => {
        if (event.target.checked) {
            setAwakeBool("True");
        } else {
            setAwakeBool("False")
        }
    };
    const handleMedTakenBool = (event: any) => {
        if (event.target.checked) {
            setMedTakenBool("True");
        } else {
            setMedTakenBool("False")
        }
    };
    const handleMedication = (event: any) => {
        const {
            target: { value },
        } = event;
        setMedName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleCondition = (event: any) => {
        setCondition(event.target.value);
    };
    const handleCondDescription = (event: any) => {
        setCondDescription(event.target.value);
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };



    const handleSubmit = (event: any) => {

        event.preventDefault();
        const token = window.localStorage.getItem('accessToken');

        if (selectedPhoto !== null &&
            name.trim() !== '' &&
            elderlyID.trim() !== '') {


            setOpenProcessingModal(true);
            const formData = new FormData();

            formData.append('file', selectedPhoto)
            formData.append('elderlyID', elderlyID);
            formData.append('label', name);

            const imageName = elderlyID + '.png';

            // Make a POST request to the server for elderly insert
            fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/face/post-face`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                method: 'POST',
                body: formData
            })
                .then(async (response) => {
                    // Make a POST request to the server for post face
                    if (response.status != 200) {
                        const apiResponse = await response.json();
                        //show alert msg
                        setOpenProcessingModal(false);
                        setOpenSnackbar(true);
                        setAlertType('error');
                        setAlertMsg("No face detected or multiple faces found. Please try another photo.!");
                        // setAlertMsg(apiResponse['message']);
                    } else {
                        const apiResponse = await response.json();

                        //
                        fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/elderly/insert`, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            },
                            method: 'POST',
                            body: JSON.stringify(
                                {
                                    "id": elderlyID,
                                    "name": name,
                                    "DOB": dateOfBirth.format('DD/MM/YYYY'),
                                    "photo": imageName,
                                    "status": {
                                        "current_activity": activity,
                                        "current_temp": temp,
                                        "medication": medName,
                                        "taken_med": medTakenBool,
                                        "condition": condition,
                                        "condition_description": condDescription,
                                        "awake": awakeBool
                                    }
                                })
                        })
                        .then(async (response) => {
                            if (response.status != 200) {
                                const apiResponse = await response.json();
                                setOpenProcessingModal(false);
                                //show alert msg
                                setOpenSnackbar(true);
                                setAlertType('error');
                                setAlertMsg("Form submission failed. Please check your inputs and try again.");
                                // setAlertMsg(apiResponse['message']);
                            } else {
                                const apiResponse = await response.json();
                                //show alert msg
                                setOpenSnackbar(true);
                                setAlertType('success');
                                setAlertMsg(`Elderly: ${name} added successfully`);

                                //reset the input fields except switch buttons
                                setSelectedPhoto(null);
                                setName('');
                                setElderlyID('');
                                setDateOfBirth(dayjs('1980-01-01'));

                                setActivity('');
                                setTemp('');

                                setMedName([]);
                                setCondition('');
                                setCondDescription('');
                                setOpenProcessingModal(false);

                            }
                        }
                        )
                        // .catch((error) => {
                        //     // Handle any error that occurred during the upload process
                        //     window.alert(`Error uploading the image:${error}`);
                        // });

                    }
                })
                .catch((error) => {
                    // Handle any error that occurred during the upload process
                    setOpenProcessingModal(false);
                });
        } else {
            // window.alert("Either photo or name or elderlyID or date of birth is missing")
            setOpenSnackbar(true);
            setAlertType('error');
            setAlertMsg("Form submission failed. Please check your inputs and try again.");
        }

    };

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
    return (
        <React.Fragment>
            <Box sx={{ marginTop: 2, paddingBottom: 10, width: "55%", margin: "auto", boxShadow: "2px", borderRadius: 10 }}>
                <Typography variant="h5" gutterBottom sx={{ marginBottom: 2, textAlign: "center" }}>
                    New Elderly
                </Typography>
                {/* <Button variant="outlined" onClick={() => console.log(dateOfBirth)}>Test</Button>
                <Button variant="outlined" onClick={()=>setDateOfBirth(dayjs('2001-05-13'))}>Reset</Button> */}
                {/* profile pic */}
                <form onSubmit={handleSubmit}>
                    <Sheet sx={{ textAlign: "center" }}>

                        <label htmlFor="contained-button-file">
                            <IconButton>

                                {selectedPhoto !== null ?
                                    <Avatar
                                        src={URL.createObjectURL(selectedPhoto)}
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                        }}
                                    /> :
                                    <Avatar
                                        src=''
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                        }}
                                    />
                                }
                            </IconButton>
                        </label>

                        <br />
                        <Button
                            variant="outlined"
                            component="label"
                            sx={{ width: 200, marginTop: 2 }}
                            size='large'
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload File
                            <input
                                type="file"
                                hidden
                                onChange={handleFileChange}
                                accept="image/*"
                            // value={value} onChange={(newValue) => setValue(newValue)}
                            />
                        </Button>
                    </Sheet>
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
                                    value={name}
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
                                    onChange={handleElderlyID}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} sx={{ marginTop: 0 }} >

                                <BasicDatePicker onDateChange={handleDate} value={dateOfBirth} resetValue={dayjs('1980-01-01')} />

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
                                            value={activity}
                                            label="Current Activity"
                                            onChange={handleActivity}
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
                                    <FormControlLabel control={<Switch defaultChecked onChange={handleAwakeBool} />} label="Awake" />

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
                                        value={medName}
                                        onChange={handleMedication}
                                        input={<OutlinedInput label="Meds" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {medication.map((med) => (
                                            <MenuItem key={med} value={med}>
                                                <Checkbox checked={medName.indexOf(med) > -1} />
                                                {/* <Checkbox checked={medName.indexOf(name) > -1} /> */}
                                                <ListItemText primary={med} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl></Grid>
                            <Grid item xs={12} sm={3}>
                                <FormGroup sx={{ paddingTop: 1 }}>
                                    <FormControlLabel control={<Switch onChange={handleMedTakenBool} />} label="Med Taken" />                            </FormGroup>
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
                                <TextareaAutosize minRows="7" onChange={handleCondDescription}
                                    style={{ width: "100%", fontSize: "inherit", font: "inherit", border: "1px solid light-grey", borderRadius: 4 }}
                                    id='Description' className='StyledTextarea' value={condDescription} placeholder="Condition Description" />
                            </Grid>

                        </Grid>
                    </Sheet>
                    {/* condition */}
                    <Sheet sx={{ alignItems: "center" }}>
                        <Button type='submit' fullWidth variant="contained" sx={{ p: 1.5, textTransform: "none", fontSize: "16px" }}>Add Elderly</Button>
                    </Sheet>
                </form>
                {/* success / error feedback */}
                <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleSnackbarClose}>
                    <Alert onClose={handleSnackbarClose} severity={alertType} sx={{ width: '100%' }}>
                        {alertMsg}
                    </Alert>
                </Snackbar>

                {/* processing modal */}
                <Modal
                    keepMounted
                    open={openProcessingModal}
                    aria-labelledby="loading"
                    aria-describedby="loading elderly data"
                >
                    <Box sx={style}>
                        <Typography id="processing" variant="h6" component="h2">
                            Processing data, please wait.
                        </Typography>
                        <LinearProgress />
                    </Box>
                </Modal>

            </Box>

        </React.Fragment>)
}