import React, { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress, Modal,  Grid, TextField, FormControl, InputLabel, MenuItem, 
    Select, Button, Snackbar, Alert, IconButton, Pagination, Dialog, DialogTitle, DialogContent,
    DialogContentText, DialogActions, } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Document, Page } from 'react-pdf';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import "react-pdf/dist/esm/Page/TextLayer.css";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import MUIDataTable from "mui-datatables";
import { Sheet } from '@mui/joy';
import { pdfjs } from 'react-pdf';
import UpdateRecord from './updateRecord';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

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

                        <IconButton sx={{ p: 0 }} onClick={() => { window.open(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/record/display?fileName=${value}`, '_blank') }}><PictureAsPdfIcon /></IconButton>
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
        fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/record/getAll`, {
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
                    data.forEach((record: any) => {
                        const row = [record.elderlyID, record.type, record.dateTime, record.name,
                        record.document_no, record.document_path]
                        fetchData.push(row)
                    });
                    setRecordData(fetchData);
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
    const [record, setRecord] = React.useState();

    const handleRowClick = (rowData: any, rowMeta: any) => {
        setRecord(rowData);
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
             const elderlyID = recordData[dataIndex][0];
             const document_no = recordData[dataIndex][4];
             // call backend to del from database
             fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/record/delete`, {
                 headers: {
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${token}`,
                 },
                 method: 'DELETE',
                 body: JSON.stringify({
                    "elderlyID": elderlyID,
                    "document_no": document_no
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
        downloadOptions: { filename: `Bridgify Record Data(${new Date().toDateString()}).csv` },
    };

    useEffect(() => {
        async function loadData() {
            setOpen(true);
            await delay(250);
            loadRecordData();
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
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom:5
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

            {updateOpen ?
                <UpdateRecord open={setUpdateOpen} setReload={setReload} setOpenSnackbar={setOpenSnackbar} setAlertType={setAlertType} setAlertMsg={setAlertMsg} record={record} />
                : null
            }

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



export function CreateRecordTab() {

    const token = window.localStorage.getItem('accessToken');

    const [documentType, setDocumentType] = useState('');
    const [documentName, setDocumentName] = useState('');
    const [documentNo, setDocumentNo] = useState('');
    const [elderlyID, setElderlyID] = useState('');

    const [pageNo, setPageNo] = useState(1);


    const [elderlyList, setElderlyList] = useState<any[]>([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState('No File Selected');

    const [openProcessingModal, setOpenProcessingModal] = React.useState(false);

    //error , warning , info , success
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertType, setAlertType]: any = useState('info');
    const [alertMsg, setAlertMsg] = useState('');


    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 100,
            },
        },
    };



    const fetchElderly = async () => {
        console.log("fetchElderly called")

        fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/elderly/getAll`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'GET'
        })
            .then(async (response) => {
                if (response.status != 200) {
                    console.log(response.json())

                } else {
                    const data = await response.json();
                    
                    //sort elderly in alphabetical order for record admin select 
                    setElderlyList(data.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name)));

                }

            })
            .catch((err) => {
                window.alert(err);
            });
    }

    function changePage(offset: number) {
        setPageNo(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }
    function handlePage(event: any, page: number) {
        console.log(page)
        setPageNo(page)
    }

    // //handle form inputs
    const handleFileChange = (event: any) => {
        if ((event.target.files)[0]) {
            setPageNo(1);

            const file = (event.target.files)[0];
            setSelectedFile(file);
            setSelectedFileName(file.name)
            console.log(file)
        } else {
            // window.alert("No file selected")
        }

    };
    const handleDocumentName = (event: any) => {
        setDocumentName(event.target.value);
    };
    const handleDocumentType = (event: any) => {
        setDocumentType(event.target.value);
    };
    const handleDocumentNo = (event: any) => {
        setDocumentNo(event.target.value);
    };
    const handleElderlyID = (event: any) => {
        setElderlyID(event.target.value);
    };

    const handleSubmit = (event: any) => {

        event.preventDefault();
        const token = window.localStorage.getItem('accessToken');

        if (selectedFile !== null && documentName.trim() !== '' && documentType.trim() !== '' && documentNo.trim() !== '' && elderlyID !== '') {


            setOpenProcessingModal(true);
            const formData = new FormData();

            formData.append('doc', selectedFile)
            formData.append('elderlyID', elderlyID);
            formData.append('type', documentType);
            formData.append('name', documentName);
            formData.append('document_no', documentNo);

            const imageName = elderlyID + '.png';

            // console.log(rawBody)
            // Make a POST request to the server for record insert
            fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/record/create`, {
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

                        setOpenProcessingModal(false);

                    } else {
                        const apiResponse = await response.json();
                        //show alert msg
                        setOpenSnackbar(true);
                        setAlertType('success');
                        setAlertMsg(`Record: ${documentNo} added successfully`);

                        //reset the input fields
                        setDocumentName('');
                        setDocumentType('');
                        setElderlyID('');
                        setSelectedFile(null);
                        setSelectedFileName('No File Selected');
                        setDocumentNo('');
                        setPageNo(1);
                        setNumPages(null);

                        setOpenProcessingModal(false);

                    }
                }
                )

                .catch((error) => {
                    setOpenProcessingModal(false);
                });
        } else {
            setOpenSnackbar(true);
            setAlertType('error');
            setAlertMsg("Form submission failed. Please check your inputs and try again.");
        }

    };
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };


    //on start up
    useEffect(() => {
        //fetch elderly for select
        fetchElderly();
    }, []);

    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({ numPages }: any) {
        setNumPages(numPages);
    }


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

        <React.Fragment> <Box sx={{ width: "70%", alignItems: "center", margin: "auto" }}>
            <Typography variant="h5" sx={{ textAlign: "center" }}>

                New Record
            </Typography>
            {/* <Button variant="outlined"
                    component="label" size="large" sx={{ height: "inherit" }} onClick={() => console.log(documentNo)}>
                    Test Button
                </Button> */}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3} sx={{ p: 2 }}>

                    <Grid item xs={6} sx={{}}>
                        <Sheet>
                            <Typography variant="h6" gutterBottom sx={{ marginBottom: 1 }}>
                                Document Information
                            </Typography>
                            <Grid container spacing={3} sx={{}}>

                                <Grid item xs={7} sx={{}}>
                                    <TextField
                                        required
                                        id="docName"
                                        name="docName"
                                        label="Document Name"
                                        value={documentName}
                                        onChange={handleDocumentName}
                                        fullWidth
                                    />

                                </Grid>
                                <Grid item xs={5} sx={{}}>
                                    <TextField
                                        required
                                        id="docNo"
                                        name="docNo"
                                        label="Document No"
                                        value={documentNo}
                                        onChange={handleDocumentNo}
                                        fullWidth
                                    />

                                </Grid>

                                <Grid item xs={12} sm={5}>
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Record Type</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={documentType}
                                                label="Document Type"
                                                onChange={handleDocumentType}
                                            >
                                                <MenuItem value={"medical"}>Medical</MenuItem>
                                                <MenuItem value={"medication"}>Medication</MenuItem>
                                                <MenuItem value={"others"}>Others</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} sm={7}>
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Elderly</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={elderlyID}
                                                label="Elderly"
                                                onChange={handleElderlyID}
                                                MenuProps={MenuProps}
                                            >

                                                {elderlyList.map((elderly) => (
                                                    <MenuItem key={elderly.id} value={elderly.id}>{elderly.name}</MenuItem>
                                                ))}

                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>


                                <Grid item xs={6} sx={{ border: "" }}>

                                    <Button variant="outlined"
                                        component="label" size="large" fullWidth sx={{ height: "inherit" }} startIcon={<CloudUploadIcon />}>
                                        Upload File<input type="file" accept=".pdf" hidden onChange={handleFileChange} />
                                    </Button>


                                </Grid>
                                <Grid item xs={5} sx={{ border: "" }}>
                                    <Typography sx={{ font: "inherit", fontSize: "inherit", display: "flex", paddingTop: 1, float: 'left' }}>{selectedFileName}</Typography>


                                </Grid>
                                <Grid item xs={12} sx={{ border: "" }}>
                                    <Button type='submit' fullWidth variant="contained" sx={{ p: 1.5, textTransform: "none", fontSize: "16px" }}>Add Record</Button>

                                </Grid>
                            </Grid>
                        </Sheet>

                    </Grid>
                    <Grid item xs={6} sx={{ margin: "auto", display: "flex" }}>
                        <Sheet sx={{ marginLeft: 3 }}>
                            {selectedFile ? <Document file={URL.createObjectURL(selectedFile)} onLoadSuccess={onDocumentLoadSuccess}>  <Page pageNumber={pageNo} height={500} /></Document> : <Typography></Typography>}
                            {numPages ? <Pagination sx={{ alignItems: "center" }} size="medium" count={numPages} onChange={handlePage} /> : <Typography></Typography>}


                            {/* <Sheet sx={{ display: "flex" }}>
                                    <IconButton aria-label="back" size="small">
                                        <ArrowBackIosIcon fontSize="inherit" />
                                    </IconButton><Typography sx={{font:"inherit"}}>{pageNo}</Typography>     <IconButton aria-label="back" size="small">
                                        <ArrowForwardIosIcon fontSize="inherit" />
                                    </IconButton></Sheet> */}


                            {/* <Button onClick={nextPage}>next page</Button> */}
                            {/* <Document
                                    file={selectedFile}
                                    onLoadSuccess={onDocumentLoadSuccess}

                                >
                                    {Array.from(new Array(selectedFile), (el, index) => (
                                        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                                    ))}

                                    <Typography>{numPages}</Typography>
                                </Document> */}
                        </Sheet>

                    </Grid>
                </Grid>
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