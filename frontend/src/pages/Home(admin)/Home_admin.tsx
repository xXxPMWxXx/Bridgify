import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ResponsiveAppBarAdmin } from '../../Navbar';
import { Alert, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, 
    DialogTitle, LinearProgress, Modal, Snackbar, Typography } from '@mui/material';
import MUIDataTable from "mui-datatables";
import UpdateUser from './updateUser';

const delay = (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms)
);
export const Home_admin = () => {
    //for reload
    const [reload, setReload] = useState(false);
    useEffect(() => {
        async function loadData() {
            setOpen(true);
            await delay(500);
            loadUserData();
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

    //for alert
    //error , warning , info , success
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertType, setAlertType]: any = useState('info');
    const [alertMsg, setAlertMsg] = useState('');
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const token = window.localStorage.getItem('accessToken');
    const accRole = window.localStorage.getItem('accRole');
    //for datatable
    const columns = ["Name", "Email", "Account Role",
        {
            name: "linkedElderly",
            label: "Linked Elderly",
            options: {
                customBodyRender: (value: any) => {
                    return (
                        value == "" ? <Typography style={{ color: 'red' }}>Not link to any elderly yet</Typography> : value
                    )
                }
            }
        }
        , "Date Created",
        {
            name: "profileImage",
            label: "profileImage",
            options: {
                customBodyRender: (value: any) => {
                    return (
                        <Avatar variant="rounded" src={`${process.env.REACT_APP_BACKEND_IMAGES_URL}/user_profile/${value}`} >
                        </Avatar>
                    )
                }
            }
        },
    ];
    const [userData, setUserData]: any[] = useState([]);
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

    const loadUserData = async () => {
        // //calling backend API
        fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/user/getAll`, {
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
                    data.forEach((user: any) => {
                        const row = [user.name, user.email, user.accRole, user.linkedElderly.toString(),
                        user.dateCreated, user.profileImage]
                        fetchData.push(row)
                    });
                    setUserData(fetchData);
                    setDataLoaded(true);
                    //close the modal
                    setOpen(false);
                }
            })
            .catch((err) => {
                window.alert(err);
            });
    }
    //For update user
    const [updateOpen, setUpdateOpen] = React.useState(false);
    const [user, SetUser] = React.useState();
    const handleRowClick = (rowData: any, rowMeta: any) => {
        SetUser(rowData);
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
        var newData = userData;
        selectedRows.forEach((element: any) => {
            const dataIndex = element.dataIndex;
            const email = userData[dataIndex][1];

            // //call backend to del from database
            fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/user/delete`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                method: 'DELETE',
                body: JSON.stringify({
                    "email": email,
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
                        //remove from datatable
                        newData.splice(dataIndex, 1);
                        setOpenSnackbar(true);
                        setAlertType('success');
                        setAlertMsg(apiResponse['message']);

                    }
                })
                .catch((error) => {
                    // Handle any error that occurred during the update process
                    window.alert(`Error during update post:${error}`);
                });

        });
        setUserData(newData);
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
        downloadOptions: { filename: `Bridgify User Data(${new Date().toDateString()}).csv`},
    };

    return (
        <div>
            {
                token == null ?
                    <Navigate to="/Login" /> : <Navigate to="/Home-admin" />
            }
            {
                token != null && accRole != 'Admin' ?
                    <Navigate to="/Forbidden" /> : null
            }
            < ResponsiveAppBarAdmin />
            <br />
            <br />
            <Box
                sx={{
                    display: 'flex',
                    width:"100%",
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom:5,
                    
                }}
            >
                {dataLoaded ?

                    <MUIDataTable
                        title={"User Accounts"}
                        data={userData}
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
                                Loading user data, please wait.
                            </Typography>
                            <LinearProgress />
                        </Box>
                    </Modal>
                }
            </Box>
            {updateOpen ?
                <UpdateUser open={setUpdateOpen} user={user} setReload={setReload} setOpenSnackbar={setOpenSnackbar} setAlertType={setAlertType} setAlertMsg={setAlertMsg} />
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
        </div>
    )
}

