import {
    Box, Modal,Button, TextField, Avatar
} from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function UpdateUser(props: any) {

    const token = window.localStorage.getItem('accessToken');
    const [updateOpen, setUpdateOpen] = React.useState(true);
    const [user, SetUser] = React.useState({ ...props.user });
    useEffect(() => {
        setSelectedPhoto(user[5].props.src)
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
        boxShadow: 24,
        p: 4,
    };
    const handleUpdateClose = () => {
        setUpdateOpen(false);
        //to update parent element
        props.open(false);
    }
    //file upload
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    //handle form inputs
    const handleFileChange = (event: any) => {
        // Get the selected files from the input
        if ((event.target.files)[0]) {
            const file = (event.target.files)[0];
            setSelectedPhoto(file);
        } else {
            // window.alert("No file selected")
        }

    };
    const [name, setName] = useState(user[0]);
    const [updatePassword, setUpdatePassword] = useState("");
    //for update the input
    const handleName = (event: any) => {
        setName(event.target.value);
    };
    const handleUpdatePassword = (event: any) => {
        setUpdatePassword(event.target.value);
    };

    const handleUpdateSubmit = (event: any) => {
        event.preventDefault();
        // // Make a POST request to the server with the formData
        fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/user/update`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            method: 'PUT',
            body: JSON.stringify({
                "email": user[1],
                "name": name,
                "password": updatePassword,
            })
        })
            .then(async (response) => {
                if (response.status != 200) {
                    const apiResponse = await response.json();
                    //pass to parent to show alert msg
                    props.setOpenSnackbar(true);
                    props.setAlertType('error');
                    props.setAlertMsg(`Something went wrong during updating user information for user email: ${user[1]}! Please try again later!`);
                } else {
                    const apiResponse = await response.json();
                    //pass to parent to show alert msg
                    props.setOpenSnackbar(true);
                    props.setAlertType('success');
                    props.setAlertMsg(`Successfully, update user information for user email: ${user[1]}!`);
                    props.setReload(true);
                    setUpdateOpen(false);
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
            aria-labelledby="updateUser"
            aria-describedby="updateUser"
        >
            <form onSubmit={handleUpdateSubmit}>
                <Box sx={{ ...style, width: 800 }} textAlign='center'>
                    <h2 id="updateUser">Update User</h2>
                    {selectedPhoto !== null ?
                        <Avatar
                            src={user[5].props.src}
                            style={{
                                width: "100px",
                                height: "100px",
                                margin: "auto",
                            }}
                        /> : null
                    }
                    <TextField
                        required
                        label="User Email"
                        value={user[1]}
                        disabled
                        sx={{ width: 500, m: 2 }}
                    />
                    <TextField
                        required
                        label="Account Role"
                        value={user[2]}
                        disabled
                        sx={{ width: 500, m: 2 }}
                    />
                    <TextField
                        required
                        label="Name"
                        value={name}
                        onChange={handleName}
                        sx={{ width: 500, m: 2 }}
                    />
                     <TextField
                        label="newPassword"
                        value={updatePassword}
                        onChange={handleUpdatePassword}
                        sx={{ width: 500, m: 2 }}
                    />
                    <Box textAlign='center'>
                        <Button type="submit" variant="contained" sx={{ width: 300, m: 3 }}>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </form>
        </Modal>
    )
}