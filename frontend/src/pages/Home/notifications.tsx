import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { Card } from 'react-bootstrap';

const imageBASEURL = `${process.env.REACT_APP_BACKEND_IMAGES_URL}/trained_face`;


function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}

export default function Notifications() {
    const token = window.localStorage.getItem('accessToken');
    const linkedElderly = window.localStorage.getItem('linkedElderly');

    const [notifications, setNotifications] = React.useState<any[]>([]); //depending on tabs
    // const [ updatedNotification, setUpdatedNotifications] = 

    const loadNotifications = async () => {
        // //calling backend API
        fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/notification/getLinked`, {
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
                    const notif = await response.json();

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

                                const updatedRows = notif.map((row: any) => {

                                    const foundItem = data.find((item: { id: any; }) => item.id === row.elderlyID);

                                    // Check if 'foundItem' exists (it will be undefined if no match is found)
                                    if (foundItem) {
                                        // Create a new object with all properties from 'row' along with the elderly name and photo
                                        return {
                                            ...row,
                                            elderlyName: foundItem.name,
                                            elderlyPhoto: foundItem.photo
                                        };
                                    } else {

                                    }

                                    //   If no matching item is found, return the original 'row' object
                                    return row;
                                });
                                console.log("Notifications are set")
                                await setNotifications(updatedRows);

                            }

                        })
                        .catch((err) => {
                            window.alert(err);
                        });
                }

            })
            .catch((err) => {
                window.alert(err);
            });

    }


    React.useEffect(() => {
        console.log("useEffect is called");
        const fetchData = async () => {
            await loadNotifications();
        };

        fetchData();
    }, [])

    return (
        <Grid item >
            {/* <CardActionArea> */}
            <Card style={{ display: 'flex', width: '400px', height: '500px', borderRadius: '10px' }}>
                {/* <Card style={{ display: 'flex', width: '400px', height: '400px', backgroundColor: 'rgba(236.94, 236.94, 236.94, 0.80)', borderRadius: '10px' }}> */}
                <Typography variant="h5" sx={{ textAlign: "center", marginTop: 2 }}>Notifications</Typography>
                {/* <Button onClick={() => { console.log(notifications) }}>TEST BUTTON</Button> */}

                <List sx={{ overflow: "auto" }}>
                    {notifications.length>0?
                    notifications.map((notif) => (
                        <ListItem sx={{ border: "1px solid #F6F6F6" }}>
                            <ListItemAvatar>
                                <Avatar src={`${imageBASEURL}/${notif.elderlyPhoto}`}>
                                    {/* <FolderIcon /> */}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2, // Limit to 2 lines
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                            }}
                                primary={`${notif.elderlyName}${notif.message} `}
                            // secondary={secondary ? 'Secondary text' : null}
                            />
                        </ListItem>
                    )):<Typography textAlign={'center'} sx={{marginTop:"170px"}} fontSize={"24px"} color={"#ADADAD"}> No Notifications</Typography>}

                </List>
            </Card>
            {/* </CardActionArea> */}
        </Grid>
    )
}