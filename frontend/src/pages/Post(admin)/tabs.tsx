import './Post_admin.css';
import {
    Box, Typography, LinearProgress, Modal,
    FormControl, InputLabel, Input, Grid, Button, Snackbar, Alert
} from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './Post_admin.css';
import React, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";

export  function PostTab() {
    const delay = (ms: number) => new Promise(
        resolve => setTimeout(resolve, ms)
    );
    //for datatable
    const token = window.localStorage.getItem('accessToken');
    const columns = ["Author Email", "Activity Type", "Description",
        {
            name: "elderlyInvolved",
            label: "Elderly Involved",
            options: {
                customBodyRender: (value: any) => {
                    return (
                        value == "" ? <Typography style={{ color: 'red' }}>No known elderly detected in the images</Typography> : value
                    )
                }
            }
        }
        , "No of Images", "Date Created"];
    const [postData, setPostData]: any[] = useState([]);
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

    const loadPostData = async () => {
        // //calling backend API
        fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/post/getAll`, {
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
                    const res = await response.json();
                    const data = res.data;
                    data.forEach((post: any) => {
                        const row = [post.author_email, post.activity_type, post.description,
                        post.elderlyInvolved.toString(), post.imagesCount, post.dateTime]

                        postData.push(row)
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

    };
    useEffect(() => {
        async function loadData() {
            setOpen(true);
            await delay(500);
            loadPostData();
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
                data={postData}
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
                        Loading post data, please wait.
                    </Typography>
                    <LinearProgress />
                </Box>
            </Modal>
        }
    </Box>
    )

}

export  function CreatePostTab() {

    const token = window.localStorage.getItem('accessToken');

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
    
    //For create post tab
    const email: any = window.localStorage.getItem('email');
    const [activityType, setActivityType] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [openProcessingModal, setOpenProcessingModal] = React.useState(false);

    //for alert
    //error , warning , info , success
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertType, setAlertType]: any = useState('info');
    const [alertMsg, setAlertMsg] = useState('');
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const handleFileChange = (event: any) => {
        // Get the selected files from the input
        const files = event.target.files;
        setSelectedFiles(Array.from(files));
    };

    const handleActivity = (event: any) => {
        setActivityType(event.target.value);
        console.log(activityType)
    };

    const handleDescription = (event: any) => {
        setDescription(event.target.value);
        console.log(description)
    };


    const handleSubmit = (event: any) => {
        event.preventDefault();
        setOpenProcessingModal(true);

        if (selectedFiles.length > 0) {

            const formData = new FormData();
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append('images', selectedFiles[i]);
            }

            formData.append('author_email', email);
            formData.append('description', description);
            formData.append('activity_type', activityType);

            // // Make a POST request to the server with the formData
            fetch(`${process.env.REACT_APP_BACKEND_DEV_URL}/post/create`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                method: 'POST',
                body: formData
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
                        setOpenProcessingModal(false);

                        //reset the input fields
                        setActivityType('');
                        setDescription('');
                        setSelectedFiles([]);

                        //show alert msg
                        setOpenSnackbar(true);
                        setAlertType('success');
                        setAlertMsg(apiResponse['message']);
                    }
                })
                .catch((error) => {
                    // Handle any error that occurred during the upload process
                    window.alert(`Error uploading the images:${error}`);
                });
        }
    }

    return (
        <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Typography variant="h4" >Create New Post</Typography>
            <form onSubmit={handleSubmit} >
                <FormControl sx={{ width: 500 }}>
                    <InputLabel htmlFor="activityTypeInput" required>Activity Type</InputLabel>
                    <Input onChange={handleActivity} id="activityTypeInput" value={activityType} aria-describedby="activityType" sx={{ m: 2 }} />
                    <TextareaAutosize onChange={handleDescription} style={{ width: "100%" }} id='Description' className='StyledTextarea' value={description} placeholder="Description" />
                </FormControl>
                <br />
                <br />
                <Box sx={{ width: "100%" }} alignItems="center" justifyContent="center">
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="image-upload"
                        onChange={handleFileChange}
                        multiple
                    />
                    <label htmlFor="image-upload">
                        <Button
                            variant="contained"
                            color="primary"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload Images
                        </Button>
                    </label>
                    {selectedFiles.length > 0 && (
                        <div>
                            <h2>Selected Images:</h2>
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {selectedFiles.map((file, index) => (
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(file)}
                                        alt={`Selected ${index + 1}`}
                                        style={{ maxWidth: '200px', maxHeight: '200px', margin: '8px' }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                </Box>

                <Box textAlign='center'>
                    <Button type="submit" variant="contained" sx={{ width: 300, m: 3 }}>
                        Submit
                    </Button>
                </Box>
            </form>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={alertType} sx={{ width: '100%' }}>
                    {alertMsg}
                </Alert>
            </Snackbar>
            <Modal
                keepMounted
                open={openProcessingModal}
                aria-labelledby="loading"
                aria-describedby="loading user data"
            >
                <Box sx={style}>
                    <Typography id="processing" variant="h6" component="h2">
                        Processing data, please wait.
                    </Typography>
                    <LinearProgress />
                </Box>
            </Modal>
        </Grid>
    )
}