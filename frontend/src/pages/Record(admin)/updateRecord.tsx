import {
    Box,  Modal, Button, TextField, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function UpdateRecord(props: any) {

    const token = window.localStorage.getItem('accessToken');
    const [updateOpen, setUpdateOpen] = React.useState(true);
    const [record, setRecord] = React.useState({ ...props.record });
    const [elderlyID, setElderlyID] = React.useState(record[0]);
    const [type, setType] = React.useState(record[1]);
    const [dateTime, setDateTime] = React.useState(record[2]);
    const [docName, setDocName] = React.useState(record[3]);
    const [docID, setDocID] = React.useState(record[4]);

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

    //for update the input
    const handleDocumentName = (event: any) => {
        setDocName(event.target.value);
    };
    const handleDocumentType = (event: any) => {
        setType(event.target.value);
    };
    const handleDocumentNo = (event: any) => {
        setDocID(event.target.value);
    };
    const handleElderlyID = (event: any) => {
        setElderlyID(event.target.value);
    };

    const handleUpdateSubmit = (event: any) => {
        event.preventDefault();
        // // Make a POST request to the server with the formData
        fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/record/update`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            method: 'PUT',
            body: JSON.stringify({
                "elderlyID": elderlyID,
                "dateTime": dateTime,
                "name": docName,
                "document_no": docID,
                "type": type
            })
        })
            .then(async (response) => {
                if (response.status != 200) {
                    const apiResponse = await response.json();
                    //pass to parent to show alert msg
                    props.setOpenSnackbar(true);
                    props.setAlertType('error');
                    props.setAlertMsg(`Something went wrong during updating record information! Please try again later!`);
                } else {
                    const apiResponse = await response.json();
                    //pass to parent to show alert msg
                    props.setOpenSnackbar(true);
                    props.setAlertType('success');
                    props.setAlertMsg(`Successfully, update record information!`);
                    props.setReload(true);
                    setUpdateOpen(false);
                }
            })
            .catch((error) => {
                // Handle any error that occurred during the update process
                window.alert(`Error during update post:${error}`);
            });
    }

    useEffect(() => {
    }, []);

    return (
        <Modal
            open={updateOpen}
            onClose={handleUpdateClose}
            aria-labelledby="updateUser"
            aria-describedby="updateUser"
        >
            <form onSubmit={handleUpdateSubmit}>
                <Box sx={{ ...style, width: 800 }} textAlign='center'>
                    <h2 id="updateRecord">Update Record</h2>

                    <TextField
                        required
                        label="elderlyID"
                        value={elderlyID}
                        disabled
                        sx={{ width: 500, m: 2 }}
                    />
                    <TextField
                        required
                        label="dateTime"
                        value={dateTime}
                        disabled
                        sx={{ width: 500, m: 2 }}
                    />

                    <FormControl sx={{ width: 500, m: 2 }}>
                        <InputLabel>Record Type</InputLabel>
                        <Select
                            value={type}
                            label="Document Type"
                            onChange={handleDocumentType}
                        >
                            <MenuItem value={"medical"}>Medical</MenuItem>
                            <MenuItem value={"medication"}>Medication</MenuItem>
                            <MenuItem value={"others"}>Others</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        required
                        label="docName"
                        value={docName}
                        onChange={handleDocumentName}
                        sx={{ width: 500, m: 2 }}
                    />
                    <TextField
                        label="docID"
                        value={docID}
                        onChange={handleDocumentNo}
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