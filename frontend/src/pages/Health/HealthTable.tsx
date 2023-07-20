/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy';
import Avatar from '@mui/joy/Avatar';
import { Navigate } from 'react-router-dom';
import { ResponsiveAppBarAdmin } from '../../Navbar';
import { Box, FormControl, Input, LinearProgress, Modal, Typography } from '@mui/material';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/joy/Table';
import { Sheet, Button } from '@mui/joy';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import { Add } from '@mui/icons-material';
import TuneIcon from '@mui/icons-material/Tune';

import MUIDataTable from 'mui-datatables';


import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';


// const imageBASEURL = `${process.env.REACT_APP_BACKEND_IMAGES_URL}/trained_face`;
const imageBASEURL = 'http://localhost:8000/images/trained_face';


const delay = (ms: number) => new Promise(
  resolve => setTimeout(resolve, ms)
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


export default function HealthTable() {

  const token = window.localStorage.getItem('accessToken');
  // const columns = ["Date", "Document No", "Document Name", "Elderly"];
  // const accRole = window.localStorage.getItem('accRole');

  const [tableData, setTableData] = React.useState<any[]>([]);
  const [rows, setRows] = React.useState<any[]>([]);
  const [fetchAdditional, setFetchAdditional] = React.useState(false);
  const [tabValue, setTabValue] = React.useState(0);

  const [open, setOpen] = React.useState(false);
  const [dataLoaded, setDataLoaded] = React.useState(false);


  const isType = (obj: any) => {
    if (tabValue === 0) {
      return obj.type === "medical"
    } else if (tabValue === 1) {
      return obj.type === "medication"
    } else if (tabValue === 2) {
      return obj.type === "others"
    }

  };

  const columns = [{
    name: "dateTime",
    label: "Published Date",
  }, {
    name: "document_no",
    label: "Document No",
  }, {
    name: "name",
    label: "Document Name",
    options: {
      filter: true,
      sort: true,
    }
  }, {
    name: "elderlyPhoto",
    label: "Elderly",
    options: {
      customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
        return (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Avatar size="sm" alt={value} src={`${imageBASEURL}/${value}`} />

          </Box>
        )
      }
    }
  }];

  //get from server, all the data
  const loadUserData = async () => {
    // //calling backend API
    fetch(`${process.env.REACT_APP_BACKEND_DEV_URL}/record/getAll`, {
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
          setTableData(data);
          setFetchAdditional(true);
          console.log("first useeffect called")
        }

      })
      .catch((err) => {
        window.alert(err);
      });

  }

  //fetch additional data
  React.useEffect(() => {
    // const elderlyImageSrc = `http://13.228.86.148:8000/images/trained_face/${photo}`;


    if (fetchAdditional) {
      //calling getall for elderly
      fetch(`${process.env.REACT_APP_BACKEND_DEV_URL}/elderly/getAll`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'GET'
      })
        .then(async (response) => {
          if (response.status != 200) {
            console.log("error fetching elderly")

          } else {
            const data = await response.json();

            const updatedRows = tableData.map(row => {

              const foundItem = data.find((item: { id: any; }) => item.id === row.elderlyID);

              // Check if 'foundItem' exists (it will be undefined if no match is found)
              if (foundItem) {
                console.log("found " + foundItem.id)
                // Create a new object with all properties from 'row' along with the elderly name and photo
                return {
                  ...row,
                  elderlyName: foundItem.name,
                  elderlyPhoto: foundItem.photo
                };
              } else {
                console.log("not found")
              }

              // If no matching item is found, return the original 'row' object
              return row;

            });

            console.log(updatedRows);
            console.log("second useeffect end");

            // Set the updated rows in the state
            await setTableData(updatedRows);
            setFetchAdditional(false);
            setRows(tableData.filter(isType));
            setDataLoaded(true)
            setOpen(false)

          }

        })
        .catch((err) => {
          window.alert(err);
        });


    }

  }, [fetchAdditional]);

  const fetchDoc = async (fileName: any) => {
    console.log("fetchDoc called");
    // event.preventDefault();
    const token = window.localStorage.getItem('accessToken');
    // const elderlyID = "327H";

    //calling backend API
    window.open(`${process.env.REACT_APP_BACKEND_DEV_URL}/record/display?fileName=${fileName}`, '_blank');
    // window.open(`${process.env.REACT_APP_BACKEND_DEV_URL}/record/display?fileName=327H_Insulin_765334.pdf`, '_blank');

    // fetch(`${process.env.REACT_APP_BACKEND_DEV_URL}/record/get?fileName=531H_Heart Report_#323145.pdf`, {
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //     'Content-Type': 'application/json',
    //   },
    //   method: 'GET'

    // })
    //   .then((response) => response.blob())
    //   .then((myBlob) => {
    //     const pdfUrl = URL.createObjectURL(myBlob);
    //     setPdfUrl(pdfUrl);
    //     window.open(pdfUrl, '_blank');

    //   });


  }

  const handleChange = async (event: React.SyntheticEvent, newValue: number) => {
    // console.log(newValue)
    setTabValue(newValue);
  }

  React.useEffect(() => {
    setRows(tableData.filter(isType));

    // const elderlyImageSrc = `http://13.228.86.148:8000/images/trained_face/${photo}`;
  }, [tableData]);

  React.useEffect(() => {
    setRows(tableData.filter(isType));
    setOpen(false)

    // const elderlyImageSrc = `http://13.228.86.148:8000/images/trained_face/${photo}`;
  }, [tabValue]);

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

  React.useEffect(() => {
    async function loadData() {
      setOpen(true);
      await delay(1000);
      loadUserData();
    }

    if (!dataLoaded) {
      loadData();
    }
  }, []);

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const options = {

  };

  // const testButton = (e: any) => {
  //   e.preventDefault();
  //   console.log('The link was clicked.');
  //   window.alert("CLICKED");
  // }

  // const elderlyFetcher = async (elderlyID:any) => {
  //   console.log("elderlyFetcher called");

  //   try {
  //     const token = window.localStorage.getItem('accessToken');
  //     const response = await fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/elderly/get/?id=${elderlyID}`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //       method: 'GET'
  //     });

  //     if (response.status !== 200) {
  //       console.log("error fetching data");
  //       return null;
  //     } else {
  //       console.log("loaded");
  //       const data = await response.json();
  //       const { name: elderlyName, photo } = data;
  //       console.log({ elderlyName, photo });
  //       return { elderlyName, photo };
  //     }
  //   } catch (err) {
  //     window.alert(err);
  //     return null;
  //   }
  // };

  // return (
  //   <div>

  //     <br />
  //     <br />

  //     <Box
  //       sx={{
  //         // display: 'flex',
  //         width: "80%",
  //         alignItems: 'center',
  //         margin: "auto",
  //       }}
  //     >

  //       {/* <MUIDataTable
  //           title={"Elderly Records"}
  //           data={rows}
  //           columns={columns}
  //           options={options}
  //         /> */}
  //       {dataLoaded ?

  //         <MUIDataTable
  //           title={"Elderly Records"}
  //           data={rows}
  //           columns={columns}
  //           options={options}
  //         /> :

  //         <Modal
  //           keepMounted
  //           open={open}
  //           aria-labelledby="loading"
  //           aria-describedby="loading user data"
  //         >
  //           <Box sx={style}>
  //             <Typography id="loading" variant="h6" component="h2">
  //               Loading user data, please wait.
  //             </Typography>
  //             <LinearProgress />
  //           </Box>
  //         </Modal>
  //       }
  //     </Box>

  //   </div>
  // )


  return (
    <React.Fragment>



      <Box sx={{ width: "80%", alignItems: 'center', margin: "auto" }}>
        <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example" sx={{ marginBottom: 2, borderBottom: 1 }}>
          <Tab label="Medical Records" {...a11yProps(0)} />
          <Tab label="Medication" {...a11yProps(1)} />
          <Tab label="Others" {...a11yProps(2)} />
        </Tabs>
        <Sheet sx={{
       
          display: {
            sm: 'flex',
          },
          flexWrap: 'wrap',
          gap: 1.5,

          // margin: "auto",   

        }}>
        {/* Search Bar */}
        <FormControl sx={{ width: "30%" }}>
          <Input placeholder="Search" />
        </FormControl>
        {/* Filter */}
        <IconButton aria-label="filter">
          <TuneIcon /></IconButton>
        {/* Add Document */}
        <Button
          startDecorator={<Add />}
          disabled={false}
          size="sm"
          variant="outlined"
          // onClick={() => { elderlyFetcher("327H")}}
          // onClick={fetchDoc}
          onClick={() => console.log(tabValue)}

        > Add Document</Button>
        </Sheet>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Sheet
            className="HealthTableContainer"
            variant="outlined"
            sx={{
              width: '100%%',
              borderRadius: 'md',
              flex: 1,
              overflow: 'auto',
              minHeight: 0,
              marginTop:2
            }}
          >

            <Table
              aria-labelledby="tableTitle"
              stickyHeader
              hoverRow
              sx={{
                '--TableCell-headBackground': (theme: { vars: { palette: { background: { level1: any; }; }; }; }) =>
                  theme.vars.palette.background.level1,
                '--Table-headerUnderlineThickness': '1px',
                '--TableRow-hoverBackground': (theme: { vars: { palette: { background: { level1: any; }; }; }; }) =>
                  theme.vars.palette.background.level1,
              }}
            >
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

              </Box>
              <thead >
                <tr style={{}}>

                  <th style={{ padding: 12, backgroundColor: "white" }}>Published Date</th>
                  <th style={{ padding: 12, backgroundColor: "white" }}>Document No</th>
                  <th style={{ padding: 12, backgroundColor: "white" }}>Name</th>
                  <th style={{ padding: 12, backgroundColor: "white" }}>Elderly</th>

                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (

                  <tr key={row._id} onClick={() => fetchDoc(row.document_path)}>
                    <td style={{ padding: 12 }}>{row.dateTime}</td>
                    <td style={{ padding: 12 }}>{row.document_no}</td>
                    <td style={{ padding: 12 }}>{row.name}</td>
                    <td >
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Avatar alt={row.elderlyName} src={`${imageBASEURL}/${row.elderlyPhoto}`} />
                        <div>
                          {row.elderlyName}
                        </div>
                      </Box>
                    </td>
                    {/* <td style={{
                    width: '20px',


                  }}>
                    <IconButton aria-label="filter" onClick={()=>fetchDoc(row.document_path)}>
                      <TuneIcon /></IconButton>
                  </td> */}
                  </tr>
                ))}
              </tbody>
            </Table>

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


          </Sheet>
        </Box>
      </Box>

    </React.Fragment>
  );
}
