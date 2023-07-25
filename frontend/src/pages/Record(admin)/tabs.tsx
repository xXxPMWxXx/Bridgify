import React, { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress, Modal, Avatar, Grid, TextField, FormControlLabel, Checkbox, FormControl, InputLabel, MenuItem, Select, FormLabel, RadioGroup, Radio, Switch, FormGroup, Button, ListItemText, OutlinedInput, Snackbar, Alert, IconButton, InputAdornment, } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useNavigate } from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import defaultPhoto from `${process.env.REACT_APP_BACKEND_IMAGES_URL}/trained_face/001A.png`;


import MUIDataTable from "mui-datatables";
import { Sheet } from '@mui/joy';

export function RecordTab() {
    const delay = (ms: number) => new Promise(
        resolve => setTimeout(resolve, ms)
    );
    const token = window.localStorage.getItem('accessToken');

    //for datatable
    const columns = ["Elderly ID", "Record Type", "Date", "Document Name", "Document No",
        {
            name: "document_path",
            label: "File",
            options: {
                customBodyRender: (value: any) => {
                    return (
                  
                        <IconButton sx={{p:0}} onClick={()=>{window.open(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/record/display?fileName=${value}`, '_blank')}}><PictureAsPdfIcon/></IconButton>
                    )
                }
            }
        }];

    const [recordData, setRecordData]: any[] = useState([]);
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

    const loadRecordData = async () => {
        // //calling backend API
        fetch(`${process.env.REACT_APP_BACKEND_DEV_URL}/record/getAll`, {
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
                    data.forEach((record: any) => {
                        const row = [record.elderlyID, record.type, record.dateTime, record.name,
                        record.document_no, record.document_path]
                        recordData.push(row)
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
            loadRecordData();
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
                    title={"Records"}
                    data={recordData}
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
                            Loading records, please wait.
                        </Typography>
                        <LinearProgress />
                    </Box>
                </Modal>
            }
        </Box>
    )
}



export function CreateRecordTab() {
    // const [name, setName] = useState('');
    // const [elderlyID, setElderlyID] = useState('');
    // const [dateOfBirth, setDateOfBirth] = React.useState<Dayjs>(dayjs('1980-01-01'));

    // const [activity, setActivity] = useState('');
    // const [temp, setTemp] = useState('');
    // const [awakeBool, setAwakeBool] = useState("True");

    // const [medName, setMedName] = useState<string[]>([]);
    // const [medTakenBool, setMedTakenBool] = useState("False");

    // const [condition, setCondition] = useState('');
    // const [condDescription, setCondDescription] = useState('');

    // //file upload
    // const [selectedPhoto, setSelectedPhoto] = useState(null);

    // const [openProcessingModal, setOpenProcessingModal] = React.useState(false);



    // //error , warning , info , success
    // const [openSnackbar, setOpenSnackbar] = useState(false);
    // const [alertType, setAlertType]: any = useState('info');
    // const [alertMsg, setAlertMsg] = useState('');



    // let navigate = useNavigate();

    // //handle form inputs
    // const handleFileChange = (event: any) => {
    //     // Get the selected files from the input

    //     if ((event.target.files)[0]) {
    //         const file = (event.target.files)[0];
    //         setSelectedPhoto(file);
    //         console.log(file)
    //     } else {
    //         // window.alert("No file selected")
    //     }

    // };
    // const handleName = (event: any) => {
    //     setName(event.target.value);
    // };
    // const handleElderlyID = (event: any) => {
    //     setElderlyID(event.target.value);
    // };
    // const handleDate = (newDate: Dayjs|null) => {
    //     // setDate(event.target.value);
    //     // if (newDate) {
    //     //     setDateOfBirth(newDate.format('DD/MM/YYYY'))
    //     // }

    //     setDateOfBirth(dayjs(newDate))

    //     console.log(newDate)
    // };
    // const handleTemp = (event: any) => {
    //     setTemp(event.target.value);
    // };
    // const handleActivity = (event: any) => {
    //     setActivity(event.target.value);
    // };
    // const handleAwakeBool = (event: any) => {
    //     if (event.target.checked) {
    //         setAwakeBool("True");
    //     } else {
    //         setAwakeBool("False")
    //     }
    // };
    // const handleMedTakenBool = (event: any) => {
    //     if (event.target.checked) {
    //         setMedTakenBool("True");
    //     } else {
    //         setMedTakenBool("False")
    //     }
    // };
    // const handleMedication = (event: any) => {
    //     const {
    //         target: { value },
    //     } = event;
    //     setMedName(
    //         // On autofill we get a stringified value.
    //         typeof value === 'string' ? value.split(',') : value,
    //     );
    // };

    // const handleCondition = (event: any) => {
    //     setCondition(event.target.value);
    // };
    // const handleCondDescription = (event: any) => {
    //     setCondDescription(event.target.value);
    // };

    // const handleSnackbarClose = () => {
    //     setOpenSnackbar(false);
    // };

 

    // const handleSubmit = (event: any) => {

    //     event.preventDefault();
    //     const token = window.localStorage.getItem('accessToken');

    //     if (selectedPhoto !== null &&
    //         name.trim() !== '' &&
    //         elderlyID.trim() !== '' ) {


    //         setOpenProcessingModal(true);
    //         const formData = new FormData();

    //         formData.append('file', selectedPhoto)
    //         formData.append('elderlyID', elderlyID);
    //         formData.append('label', name);
            
    //         const imageName = elderlyID + '.png';

    //         // console.log(rawBody)
    //         // Make a POST request to the server for elderly insert
    //         fetch(`${process.env.REACT_APP_BACKEND_DEV_URL}/elderly/insert`, {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //                 'Content-Type': 'application/json',
    //             },
    //             method: 'POST',
    //             body: JSON.stringify(
    //                 {
    //                     "id": elderlyID,
    //                     "name": name,
    //                     "DOB": dateOfBirth.format('DD/MM/YYYY'),
    //                     "photo": imageName,
    //                     "status": {
    //                         "current_activity": activity,
    //                         "current_temp": temp,
    //                         "medication": medName,
    //                         "taken_med": medTakenBool,
    //                         "condition": condition,
    //                         "condition_description": condDescription,
    //                         "awake": awakeBool
    //                     }
    //                 })
    //         })
    //             .then(async (response) => {
    //                 // Make a POST request to the server for post face
    //                 if (response.status != 200) {
    //                     const apiResponse = await response.json();
    //                     //show alert msg
    //                     setOpenSnackbar(true);
    //                     setAlertType('error');
    //                     setAlertMsg("Form submission failed. Please check your inputs and try again.");
    //                     // setAlertMsg(apiResponse['message']);
    //                 } else {
    //                     const apiResponse = await response.json();

    //                     //
    //                     fetch(`${process.env.REACT_APP_BACKEND_DEV_URL}/face/post-face`, {
    //                         headers: {
    //                             'Authorization': `Bearer ${token}`,
    //                         },
    //                         method: 'POST',
    //                         body: formData
    //                     }).then(async (response) => {

    //                         if (response.status != 200) {
    //                             const apiResponse = await response.json();
    //                             //show alert msg
    //                             setOpenSnackbar(true);
    //                             setAlertType('error');
    //                             setAlertMsg("Form submission failed. Please check your inputs and try again.");
    //                             // setAlertMsg(apiResponse['message']);
    //                         } else {
    //                             const apiResponse = await response.json();
    //                             //show alert msg
    //                             setOpenSnackbar(true);
    //                             setAlertType('success');
    //                             setAlertMsg(`Elderly: ${name} added successfully`);

    //                             //reset the input fields except switch buttons
    //                             setSelectedPhoto(null);
    //                             setName('');
    //                             setElderlyID('');
    //                             setDateOfBirth(dayjs('1980-01-01'));

    //                             setActivity('');
    //                             setTemp('');

    //                             setMedName([]);
    //                             setCondition('');
    //                             setCondDescription('');
    //                             setOpenProcessingModal(false);

    //                         }
    //                     }
    //                     )
    //                     // .catch((error) => {
    //                     //     // Handle any error that occurred during the upload process
    //                     //     window.alert(`Error uploading the image:${error}`);
    //                     // });

    //                 }
    //             })
    //             .catch((error) => {
    //                 // Handle any error that occurred during the upload process
    //                 setOpenProcessingModal(false);
    //             });
    //     } else {
    //         // window.alert("Either photo or name or elderlyID or date of birth is missing")
    //         setOpenSnackbar(true);
    //         setAlertType('error');
    //         setAlertMsg("Form submission failed. Please check your inputs and try again.");
    //     }

    // };

    // //for modal
    // const style = {
    //     position: 'absolute' as 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     width: 400,
    //     bgcolor: 'background.paper',
    //     border: '2px solid #000',
    //     boxShadow: 24,
    //     p: 4,
    // };
    return (
        <React.Fragment>


        </React.Fragment>)
}