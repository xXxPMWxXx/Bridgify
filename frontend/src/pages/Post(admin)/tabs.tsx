import './Post_admin.css';
import {
    Box, Typography, LinearProgress, Modal,
    Grid, Button, Snackbar, Alert, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Card, CardMedia
} from '@mui/material';
import {TextareaAutosize} from '@mui/base/TextareaAutosize';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './Post_admin.css';
import React, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Carousel from 'react-material-ui-carousel';
import CarouselSlide from 'react-material-ui-carousel';


export function PostTab() {
    const delay = (ms: number) => new Promise(
        resolve => setTimeout(resolve, ms)
    );
    //for alert
    //error , warning , info , success
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertType, setAlertType]: any = useState('info');
    const [alertMsg, setAlertMsg] = useState('');
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    //for datatable
    const [delayTime, setDelayTIme] = useState(300);

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
        overflow: 'scroll',
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
                    const fetchData: any = [];
                    res.data.forEach((post: any) => {
                        const row = [post.author_email, post.activity_type, post.description,
                        post.elderlyInvolved.toString(), post.imagesCount, post.dateTime, post.postImages]
                        fetchData.push(row)
                    });
                    setPostData(fetchData);
                    setDataLoaded(true);
                    //close the modal
                    setOpen(false);
                }
            })
            .catch((err) => {
                window.alert(err);
            });
    }

    const [selectedRows, setSelectedRows] = useState([]);

    const onRowsSelect = (curRowSelected: any, allRowsSelected: any) => {
        try {
            setSelectedRows(allRowsSelected);
        } catch (error) {
            window.alert(`Error during selecting post:${error}`);
        }
    }
    //reload datatable
    const [reload, setReload] = useState(false);

    //For update post
    const [updateOpen, setUpdateOpen] = React.useState(false);
    const [authorEmail, setAuthorEmail] = React.useState('');
    const [activityType, setActivityType] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [createdDate, setCreatedDate] = React.useState('');
    const [images, setImages] = React.useState([]);
    //for update the input
    const handleActivity = (event: any) => {
        setActivityType(event.target.value);
    };

    const handleDescription = (event: any) => {
        setDescription(event.target.value);
    };

    const handleRowClick = (rowData: any, rowMeta: any) => {
        console.log(rowData, rowMeta);
        const dataIndex = rowMeta.dataIndex;
        const imgName = postData[dataIndex][6];
        // set the selected row images for display
        setImages(imgName);
        setAuthorEmail(rowData[0]);
        setActivityType(rowData[1]);
        setDescription(rowData[2]);
        setCreatedDate(rowData[5]);
        setUpdateOpen(true);
    };

    const handleUpdateClose = () => {
        setUpdateOpen(false);
    }

    const handleUpdateSubmit = (event: any) => {
        event.preventDefault();
        // // Make a POST request to the server with the formData
        fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/post/update`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            method: 'PUT',
            body: JSON.stringify({
                "author_email": authorEmail,
                "dateTime": createdDate,
                "activity_type": activityType,
                "description": description,
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
                    //show alert msg
                    setOpenSnackbar(true);
                    setAlertType('success');
                    setAlertMsg(apiResponse['message']);
                    setUpdateOpen(false);
                    setReload(true);
                }
            })
            .catch((error) => {
                // Handle any error that occurred during the update process
                window.alert(`Error during update post:${error}`);
            });
    }

    //for deletion
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

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
            const author_email = postData[dataIndex][0];
            const dateTime = postData[dataIndex][5];
            // //call backend to del from database
            fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/post/delete`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                method: 'DELETE',
                body: JSON.stringify({
                    "author_email": author_email,
                    "dateTime": dateTime,
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
                        //show alert msg
                        setOpenSnackbar(true);
                        setAlertType('success');
                        setAlertMsg(apiResponse['message']);
                        setReload(true);
                    }
                })
                .catch((error) => {
                    // Handle any error that occurred during the update process
                    window.alert(`Error during update post:${error}`);
                });
        });
        // After the deletion is successful, close the dialog
        handleCloseConfirmDialog();
    };

    const options = {
        print: true,
        download: true,
        rowHover: true,
        onRowsSelect: onRowsSelect,
        onRowClick: handleRowClick,
        onRowsDelete: handleClickDeleteIcon,
        downloadOptions: { filename: `Bridgify Post Data(${new Date().toDateString()}).csv` },
    };

    useEffect(() => {
        async function loadData() {
            setOpen(true);
            await delay(delayTime);
            loadPostData();
        }

        if (!dataLoaded) {
            loadData();
        }

        if (reload) {
            loadPostData();
            setReload(false);
        }
    }, [reload]);

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
                    title={"Post Data"}
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
            {/* For update post */}
            <Modal
                open={updateOpen}
                onClose={handleUpdateClose}
                aria-labelledby="updatePost"
                aria-describedby="updatePost"
                sx={{
                    position: 'absolute',
                    top: '8%',
                    overflow: 'scroll',
                    height: '100%',
                    display: 'block'
                }}
            >

                <form onSubmit={handleUpdateSubmit}>
                    <Box sx={{ ...style, width: 800, mt: 5, }} textAlign='center'>
                        <h2 id="updatePost">Update Post</h2>
                        <TextField
                            required
                            id="authorEmail"
                            name="authorEmail"
                            label="Author Email"
                            value={authorEmail}
                            disabled
                            sx={{ width: 500, m: 2 }}
                        />
                        <TextField
                            required
                            id="createdDate"
                            name="createdDate"
                            label="Created Date"
                            value={createdDate}
                            disabled
                            sx={{ width: 500, m: 2 }}
                        />
                        <TextField
                            required
                            id="activityType"
                            name="activityType"
                            label="Activity Type"
                            value={activityType}
                            onChange={handleActivity}
                            sx={{ width: 500, m: 2 }}
                        />

                        <TextareaAutosize onChange={handleDescription} style={{ width: 500 }} id='Description' className='StyledTextarea' value={description} placeholder="Description" />

                        <Carousel sx={{ height: "350px", width: "100%", mt: 5 }}>
                            {images.map((imgName: any) => (
                                <CarouselSlide key={imgName}>
                                    <Card>
                                        <CardMedia
                                            image={`${process.env.REACT_APP_BACKEND_IMAGES_URL}/post/${imgName}`}
                                            title={activityType}
                                            style={{ height: 300 }}
                                        />
                                    </Card>
                                </CarouselSlide>
                            ))}
                        </Carousel>

                        <Box textAlign='center'>
                            <Button type="submit" variant="contained" sx={{ width: 300, mb: 5 }}>
                                Update
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Modal>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={alertType} sx={{ width: '100%' }}>
                    {alertMsg}
                </Alert>
            </Snackbar>
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
        </Box >
    )

}



export function CreatePostTab() {

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
    };

    const handleDescription = (event: any) => {
        setDescription(event.target.value);
    };


    const handleSubmit = (event: any) => {
        event.preventDefault();

        if (selectedFiles.length > 0) {
            setOpenProcessingModal(true);
            const formData = new FormData();
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append('images', selectedFiles[i]);
            }

            formData.append('author_email', email);
            formData.append('description', description);
            formData.append('activity_type', activityType);

            // // Make a POST request to the server with the formData
            fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/post/create`, {
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
        } else {

            //show alert msg
            setOpenSnackbar(true);
            setAlertType('error');
            setAlertMsg("Please upload as least one image!");
        }
    }

    return (
        <Box sx={{ width: "70%", alignItems: "center", margin: "auto" }}>


            <Typography variant="h5" gutterBottom sx={{ marginBottom: 3, textAlign: "center" }}>
                Create New Post
            </Typography>
            <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                <Grid container spacing={2}>
                    <Grid item xs={6} sx={{}}>
                        <Grid container spacing={2} sx={{}}>
                            <Grid item xs={12}>

                                <Button
                                    variant="outlined"
                                    component="label"
                                    sx={{ marginBottom: 2 }}
                                    size='large'
                                    startIcon={<CloudUploadIcon />}
                                    fullWidth
                                >
                                    Upload File
                                    <input
                                        type="file"
                                        hidden
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        multiple
                                    />
                                </Button>
                            </Grid>
                            <Grid item xs={12}>

                                <TextField
                                    required
                                    id="activityType"
                                    name="activityType"
                                    label="Activity Type"
                                    value={activityType}
                                    onChange={handleActivity}
                                    fullWidth
                                    sx={{ marginBottom: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12}>

                                <TextareaAutosize onChange={handleDescription} minRows={5}
                                    style={{ fontSize: "inherit", font: "inherit", border: "1px solid light-grey", borderRadius: 4, width: "100%" }} id='Description' className='StyledTextarea' value={description} placeholder="Description" />

                            </Grid>
                            <Grid item xs={12}>


                                <Button type="submit" variant="contained" size='large' fullWidth sx={{ fontSize: "inherit", height: "inherit", width: "100%", marginTop: 2 }}>
                                    Submit
                                </Button></Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={2} sx={{marginLeft:2}}>
                            <Grid item xs={12}></Grid>
                            {selectedFiles.length > 0 && (

                                <ImageList sx={{ width: 500, height: "100%" }} cols={3} rowHeight={164} gap={2}>
                                    {selectedFiles.map((file, index) => (
                                        <ImageListItem key={index}>
                                            <img
                                                src={`${URL.createObjectURL(file)}?w=164&h=164&fit=crop&auto=format`}
                                                srcSet={`${URL.createObjectURL(file)}`}
                                                alt={`Selected ${index + 1}`}
                                                loading="lazy"
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>

                            )}
                        </Grid>
                    </Grid>
                </Grid>
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
        </Box >
    )
}