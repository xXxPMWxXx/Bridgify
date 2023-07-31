import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { CardActionArea, CardContent, CardMedia } from '@mui/material';
import { Card } from 'react-bootstrap';
import { BorderAllRounded, SportsRugbySharp } from '@mui/icons-material';


interface notificationInfo{
    notifs: {
        image: string;
        sender: String;
        message: String;
        time: number;
    }
}

function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}

export default function notifications(props:notificationInfo) {
    const { notifs } = props;

    return (
        <Grid item xs={8} md={6}>
            <CardActionArea>
                <Card style={{display:'flex', width:'400px', height:'400px', position:'absolute', backgroundColor:'rgba(236.94, 236.94, 236.94, 0.80)', borderRadius:'10px'}}>

                </Card>
            </CardActionArea>
        </Grid>
    )
}