/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import { Box, FormControl, LinearProgress, Modal, Typography, FormGroup, Popover, TextField, InputAdornment } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/joy/Table';
import { Sheet } from '@mui/joy';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/joy/IconButton';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';

const imageBASEURL = `${process.env.REACT_APP_BACKEND_IMAGES_URL}/trained_face`;
// const imageBASEURL = 'http://localhost:8000/images/trained_face';


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
  const linkedElderly = window.localStorage.getItem('linkedElderly');
  const email = window.localStorage.getItem('email');

  const [tableData, setTableData] = React.useState<any[]>([]); //raw data
  const [fetchAdditional, setFetchAdditional] = React.useState(false); //for elderly info

  const [rows, setRows] = React.useState<any[]>([]); //depending on tabs
  const [tabValue, setTabValue] = React.useState(0);

  const [loadProgressOpen, setLoadProgressOpen] = React.useState(false);
  const [dataLoaded, setDataLoaded] = React.useState(false);

  const [elderly, setElderly] = React.useState<any[]>([]); //depending on tabs

  const [selectedElderly, setSelectedElderly] = React.useState<string[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  //filter condition for tab
  const isType = (obj: any) => {
    if (tabValue === 0) {
      return true;
    } else if (tabValue === 1) {
      return obj.type === "medical"
    } else if (tabValue === 2) {
      return obj.type === "medication"
    } else if (tabValue === 3) {
      return obj.type === "others"
    }

  };

  //filter for selected elderly
  const isSelectedElderly = (obj: any) => {
    return selectedElderly.includes(obj.elderlyID)
  };

//search filter for document name
  const isQuery = (obj: any) => {
    const wordArray = obj.name.toLowerCase().split(' ');
    return wordArray.some((word: string) => word.startsWith(searchQuery));

  };

  //get from server, all the data for the linked elderly only
  const loadUserData = async () => {
    // //calling backend API
    fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/record/getLinked`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "linkedElderly": linkedElderly,
      }),
      method: 'POST'
    })
      .then(async (response) => {
        if (response.status != 200) {
          console.log(response.json())

        } else {
          const data = await response.json();
          console.log(data)
          setTableData(data);
          setFetchAdditional(true);
        }

      })
      .catch((err) => {
        window.alert(err);
      });

  }

  //fetch additional elderly data
  React.useEffect(() => {
    if (fetchAdditional) {
      //calling getall for elderly
      fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/elderly/getAll`, {
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
                // console.log("found " + foundItem.id)
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
            setLoadProgressOpen(false)

          }

        })
        .catch((err) => {
          window.alert(err);
        });


    }

  }, [fetchAdditional]);

  //on start up
  React.useEffect(() => {
    async function loadData() {
      console.log("first useeffect called")
      setLoadProgressOpen(true);
      await delay(500);
      loadUserData();
      elderlyFetcher();
    }

    if (!dataLoaded) {
      loadData();
    }
  }, []);

  //set default checked boxes
  React.useEffect(() => {
    if(elderly.length >0){
    elderly.forEach((e) =>
      selectedElderly.push(e.id)
    )}
  }, [elderly]);

  //retrieve linked elderly informatino
  const elderlyFetcher = async () => {
    console.log("elderlyFetcher called");

    try {
      const token = window.localStorage.getItem('accessToken');
      const response = await fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/elderly/getByUser/?email=${email}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'GET'
      });

      if (response.status !== 200) {
        console.log("error fetching data");
        return null;
      } else {
        console.log("loaded");
        const data = await response.json();
        setElderly(data);

      }
    } catch (err) {
      window.alert(err);
      return null;
    }
  };

  const handleChange = async (event: React.SyntheticEvent, newValue: number) => {
    // console.log(newValue)
    setTabValue(newValue);
  }
  const handleCheck = (event: any) => {
    const checkedElderlyId = event.target.name;

    // Check if the elderly is already selected
    if (selectedElderly.includes(checkedElderlyId)) {
      // If it's already selected, remove it from the selectedElderly array
      setSelectedElderly((prevSelectedElderly) =>
        prevSelectedElderly.filter((elderlyId) => elderlyId !== checkedElderlyId)
      );
    } else {
      // If it's not selected, add it to the selectedElderly array
      setSelectedElderly((prevSelectedElderly) => [...prevSelectedElderly, checkedElderlyId]);
    }
  };

  const handleSearch = (event: any) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  //filter and sets filtered rows
  React.useEffect(() => {
    setRows(tableData.filter(isType).filter(isSelectedElderly).filter(isQuery));
  }, [tableData, tabValue, selectedElderly, searchQuery]);



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



  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  //filter dropdown
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;



  return (
    <React.Fragment>


      <Box sx={{ width: "80%", alignItems: 'center', margin: "auto" }}>
        <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example"
          sx={{
            marginBottom: 2, borderBottom: 1,
            ".Mui-selected": { color: "#30685e !important" }
          }} TabIndicatorProps={{
            style: {
              backgroundColor: "#30685e"
            }
          }}>
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Medical Records" {...a11yProps(1)} />
          <Tab label="Medication" {...a11yProps(2)} />
          <Tab label="Others" {...a11yProps(3)} />
        </Tabs>
        <Sheet sx={{

          display: {
            sm: 'flex',
          },
          flexWrap: 'wrap',
          gap: 1.5,

        }}>
          {/* Search Bar */}
          <Box
            component="form"
            sx={{
              '& > :not(style)': { width: '30ch' },
            }}
            noValidate
            autoComplete="off"
          >

            <TextField
              id="input-with-icon-textfield"
              size="small"
              label="Search By Report Name"
              variant="outlined"
              fullWidth
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>

                ), style: { borderRadius: 5 }

              }}
            />

          </Box>
          {/* Filter */}

          <IconButton aria-label="filter"
            aria-describedby={id}
            onClick={handleFilterClick} sx={{
              border: "2px solid #30685e",
              backgroundColor: open ? "#30685e" : "white",
              color: open ? "white" : "#30685e",
              ":hover": {
                bgcolor: "#224942",
                color: "white"
              }
            }}>
            <TuneIcon /></IconButton>
          <Box style={{ borderColor: "black", borderWidth: "3px" }}>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              slotProps={{ paper: { sx: { p: 1, marginTop: 1, borderRadius: 3, border: "1px solid #30685e", boxShadow: "none" } } }}
              onClose={handleClose}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }} sx={{
                border: "2px solid #3A5FCD"
              }}
            >
          
                {linkedElderly==""?<Typography>No elderly found</Typography>:
                  elderly.map((e: any) => (
                    <FormGroup sx={{ p: 1.5, margin: "auto", borderWidth: 2, borderColor: "black", }}>
                      <FormControl sx={{ padding: "auto" }}>
                        <Box sx={{ display: 'flex', gap: 1.2, alignItems: 'center', textAlign: "right" }}>

                          <Checkbox key={e.id} name={e.id} onClick={handleCheck} checked={selectedElderly.indexOf(e.id) > -1} sx={{
                            accentColor: "#30685e",
                            '&.Mui-checked': {
                              color: "#30685e !important"
                            },
                          }}
                          />
                          <Sheet style={{ marginLeft: 2 }}>
                            <Avatar alt={e.name} src={`${imageBASEURL}/${e.photo}`} sx={{}} /></Sheet>
                          <Typography>
                            {e.name}
                          </Typography>
                        </Box>
                      </FormControl>

                    </FormGroup>))
                }
            </Popover>
          </Box>
         
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
              marginTop: 2
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

                  <tr key={row.document_no} onClick={() => { window.open(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/record/display?fileName=${row.document_path}`, '_blank') }} style={{ cursor: "pointer" }}>
                    <td style={{ padding: 12 }}>{row.dateTime}</td>
                    <td style={{ padding: 12 }}>{row.document_no}</td>
                    <td style={{ padding: 12 }}>{row.name}</td>
                    <td >
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Avatar alt={row.elderlyName} src={`${imageBASEURL}/${row.elderlyPhoto}`} />
                        <Typography sx={{ font: "inherit" }}>
                          {row.elderlyName}
                        </Typography>
                      </Box>
                    </td>
                 
                  </tr>
                ))}


              </tbody>
            </Table>
            {rows.length>0?<Typography></Typography>:<Box textAlign={'center'} sx={{p:5}} fontSize={"24px"}>No Records Found...</Box>}


            <Modal
              keepMounted
              open={loadProgressOpen}
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


          </Sheet>
        </Box>              

      </Box>

    </React.Fragment>
  );
}
