/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { Add } from '@mui/icons-material';
import TuneIcon from '@mui/icons-material/Tune';
import logo from './327H.png'; 
// const images = require.context('backend\images\trained_face', true);



// const elderlyFetcher = async (elderlyID:any) => {
//   console.log("elderlyFetcher called");
//   // event.preventDefault();
//   const token = window.localStorage.getItem('accessToken');
//   // const elderlyID = "327H";

//   // //calling backend API
//   fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/elderly/get/?id=${elderlyID}`, {
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//     method: 'GET'
//   })
//     .then(async (response) => {
//       if (response.status != 200) {
//         console.log("error fetching data")
//         return null;

//       } else {
//         console.log("loaded")
//         const data = await response.json();
//         const { name: elderlyName, photo } = data;
//         console.log({ elderlyName, photo });

//         return { elderlyName, photo };

//       }

//     })
//     .catch((err) => {
//       window.alert(err);
//       return null;
//     });

// }

const testButton = (e: any) => {
  e.preventDefault();
  console.log('The link was clicked.');
  window.alert("CLICKED");
}

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


const rows = [
  {
    id: 'INV-1234',
    date: 'Feb 3, 2023',
    status: 'Paid',
    customer: {
      initial: 'O',
      name: 'Olivia Ryhe',
      email: 'olivia@email.com',
    },
    subscription: 'Yearly',
  },
  {
    id: 'INV-1233',
    date: 'Feb 3, 2023',
    status: 'Paid',
    customer: {
      initial: 'S',
      name: 'Steve Hampton',
      email: 'steve.hamp@email.com',
    },
    subscription: 'Monthly',
  },
  {
    id: 'INV-1232',
    date: 'Feb 3, 2023',
    status: 'Paid',
    customer: {
      initial: 'C',
      name: 'Ciaran Murray',
      email: 'ciaran.murray@email.com',
    },
    subscription: 'Yearly',
  },
  {
    id: 'INV-1231',
    date: 'Feb 3, 2023',
    status: 'Refunded',
    customer: {
      initial: 'M',
      name: 'Maria Macdonald',
      email: 'maria.mc@email.com',
    },
    subscription: 'Yearly',
  },
  {
    id: 'INV-1230',
    date: 'Feb 3, 2023',
    status: 'Paid',
    customer: {
      initial: 'C',
      name: 'Charles Fulton',
      email: 'fulton@email.com',
    },
    subscription: 'Yearly',
  },
  {
    id: 'INV-1229',
    date: 'Feb 3, 2023',
    status: 'Cancelled',
    customer: {
      initial: 'J',
      name: 'Jay Hooper',
      email: 'hooper@email.com',
    },
    subscription: 'Yearly',
  },
  {
    id: 'INV-1228',
    date: 'Feb 3, 2023',
    status: 'Cancelled',
    customer: {
      initial: 'K',
      name: 'Krystal Stevens',
      email: 'k.stevens@email.com',
    },
    subscription: 'Monthly',
  },
  {
    id: 'INV-1227',
    date: 'Feb 3, 2023',
    status: 'Paid',
    customer: {
      initial: 'S',
      name: 'Sachin Flynn',
      email: 's.flyn@email.com',
    },
    subscription: 'Monthly',
  },
  {
    id: 'INV-1226',
    date: 'Feb 3, 2023',
    status: 'Cancelled',
    customer: {
      initial: 'B',
      name: 'Bradley Rosales',
      email: 'brad123@email.com',
    },
    subscription: 'Monthly',
  },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function HealthTable() {
  const [rows, setRows] = React.useState<any[]>([]);
  const [fetchAdditional, setFetchAdditional] = React.useState(false);

  // const getImagePath = (imageName: String) => {
  //   console.log(`../../../backend/images/trained_face/${imageName}`)
  //   return `../../backend/images/trained_face/327H.png`;
  // };

  //fetch initial data
  React.useEffect(() => {
    const token = window.localStorage.getItem('accessToken');

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
          setRows(data);
          setFetchAdditional(true);
          console.log("first useeffect called")
        }

      })
      .catch((err) => {
        window.alert(err);
      });

  }, []);

  //fetch additional data
  React.useEffect(() => {
    const token = window.localStorage.getItem('accessToken');
    // const elderlyImageSrc = `http://13.228.86.148:8000/images/trained_face/${photo}`;


    if (fetchAdditional) {
      // //calling backend API
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

            const updatedRows = rows.map(row => {

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
            setRows(updatedRows);
            setFetchAdditional(false);

          }

        })
        .catch((err) => {
          window.alert(err);
        });


    }
    




  }, [fetchAdditional]);

 
  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
        >
          <Option value="paid">Paid</Option>
          <Option value="pending">Pending</Option>
          <Option value="refunded">Refunded</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      </FormControl>

      <FormControl size="sm">
        <FormLabel>Category</FormLabel>
        <Select placeholder="All">
          <Option value="all">All</Option>
        </Select>
      </FormControl>

      <FormControl size="sm">
        <FormLabel>Customer</FormLabel>
        <Select placeholder="All">
          <Option value="all">All</Option>
        </Select>
      </FormControl>
    </React.Fragment>
  );
  return (
    <React.Fragment>


      <Sheet
        className="SearchAndFilters-tabletUp"
        sx={{
          width: '80%',
          py: 2,
          display: {
            sm: 'flex',
          },
          flexWrap: 'wrap',
          gap: 1.5,

          marginLeft: "auto",
          marginRight: "auto"

        }}
      >
        {/* Search Bar */}
        <FormControl sx={{ width: "30%" }}>
          <Input placeholder="Search" startDecorator={<i data-feather="search" />} />
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
        // onClick={testButton}
        // onClick={elderlyFetcher}

        > Add Document</Button>


      </Sheet>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Sheet
          className="OrderTableContainer"
          variant="outlined"
          sx={{
            width: '80%',
            borderRadius: 'md',
            flex: 1,
            overflow: 'auto',
            minHeight: 0,
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
            <thead>
              <tr>

                { /* <th style={{ width: 140, padding: 12 }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                  fontWeight="lg"
                  endDecorator={<i data-feather="arrow-down" />}
                  sx={{
                    '& svg': {
                      transition: '0.2s',
                      transform:
                        order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                    },
                  }}
                >
                  Invoice
                </Link>
              </th> */}
                <th style={{ padding: 12 }}>Date</th>
                <th style={{ padding: 12 }}>Document No</th>
                <th style={{ padding: 12 }}>Name</th>
                <th style={{ padding: 12 }}>Elderly</th>

              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (

                <tr key={row._id}>
                  <td style={{ padding: 12 }}>{row.dateTime}</td>
                  <td style={{ padding: 12 }}>{row.document_no}</td>
                  <td style={{ padding: 12 }}>{row.name}</td>
                  <td >
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Avatar alt={row.elderlyName} src={`http://localhost:8000/images/trained_face/${row.elderlyPhoto}`} />
                      <div>
                        <Typography
                          fontWeight="lg"
                          level="body3"
                          textColor="text.primary"
                        >
                          {row.elderlyName}
                        </Typography>
                      </div>
                    </Box>
                  </td>

                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
      </Box>
      {/* <Box
        className="Pagination-mobile"
        sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}
      >
        <IconButton
          aria-label="previous page"
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <i data-feather="arrow-left" />
        </IconButton>
        <Typography level="body2" mx="auto">
          Page 1 of 10
        </Typography>
        <IconButton
          aria-label="next page"
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <i data-feather="arrow-right" />
        </IconButton>
      </Box> */}
      {/* <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 4,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}
      >
        <Button
          size="sm"
          variant="plain"
          color="neutral"
          startDecorator={<i data-feather="arrow-left" />}
        >
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />
        {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
          <IconButton
            key={page}
            size="sm"
            variant={Number(page) ? 'outlined' : 'plain'}
            color="neutral"
          >
            {page}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />

        <Button
          size="sm"
          variant="plain"
          color="neutral"
          endDecorator={<i data-feather="arrow-right" />}
        >
          Next
        </Button>
      </Box> */}
    </React.Fragment>
  );
}
