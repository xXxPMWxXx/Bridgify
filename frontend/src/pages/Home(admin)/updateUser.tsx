import {
    Box, Typography, LinearProgress, Modal,
    Grid, Button, Snackbar, Alert, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React, { useEffect, useState } from 'react';



export default function UpdateUser(props: any) {
    const [updateOpen, setUpdateOpen] = React.useState(true);
    const [user, SetUser] = React.useState({...props.user});

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
        boxShadow: 24,
        p: 4,
    };
    const handleUpdateClose = () => {
        setUpdateOpen(false);
        //to update parent element
        props.open(false);
    }

    const [name, setName] = useState(user[0]);
    //for update the input
    const handleName = (event: any) => {
        setName(event.target.value);
    };

    const handleUpdateSubmit = (event: any) => {
        event.preventDefault();
        //TODO: impplement backend API call
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