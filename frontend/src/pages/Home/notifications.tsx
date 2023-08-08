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

    //function to calculate the time elapsed
    const getTimeElapsed = (dateTime: string): string => {
        const postDateTime = new Date(dateTime);
        const currentTime = new Date();
        const timeDiffInMs = currentTime.getTime() - postDateTime.getTime();
        const secondsDiff = Math.floor(timeDiffInMs / 1000);

        if (secondsDiff < 60) {
            return `${secondsDiff} seconds ago`;
        }

        const minutesDiff = Math.floor(secondsDiff / 60);
        if (minutesDiff < 60) {
            return `${minutesDiff} minutes ago`;
        }

        const hoursDiff = Math.floor(minutesDiff / 60);
        if (hoursDiff < 24) {
            return `${hoursDiff} hours ago`;
        }

        const daysDiff = Math.floor(hoursDiff / 24);
        if (daysDiff === 1) {
            return `${daysDiff} day ago`;
        } else {
            return `${daysDiff} days ago`;
        }
    }

    React.useEffect(() => {
        const fetchData = async () => {
            await loadNotifications();
        };

        fetchData();
    }, [])

    return (
        <Grid item >
            <Card style={{ display: 'flex', width: '400px', height: '500px', borderRadius: '10px', backgroundColor: 'rgba(236.94, 236.94, 236.94, 0.40)', marginTop: -30, marginLeft: -30 }}>
                <Typography variant="h5" sx={{ textAlign: "left", marginTop: 2, font: 'Roboto', fontWeight: 500, fontSize: 21, marginLeft: 3.5 }}>Notifications</Typography>

                <List sx={{ overflow: "auto" }}>
                    {notifications.length > 0 ?
                        notifications.map((notif) => (
                            <ListItem sx={{ border: "0.5px solid rgba(201.88, 201.88, 201.88, 0.60)" }}>
                                <ListItemAvatar>
                                    <Avatar src={`${imageBASEURL}/${notif.elderlyPhoto}`}>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText sx={{
                               
                                }}
                                    primary={<Typography
                                        sx={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2, // Limit to 2 lines
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                        }}
                                        component="span"
                                        variant="body2"
                                    >
                                        {`${notif.elderlyName}${notif.message} `}

                                    </Typography>}
                                    secondary={<Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.secondary"

                                    >
                                        {getTimeElapsed(notif.date)}

                                    </Typography>}
                                />
                            </ListItem>
                        )) : <Typography textAlign={'center'} sx={{ marginTop: "170px" }} fontSize={"24px"} color={"#ADADAD"}> No Notifications</Typography>}

                </List>
            </Card>

        </Grid>
    )
}