import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { CardActionArea, CardContent, CardMedia } from '@mui/material';
import { Card } from 'react-bootstrap';
import { BorderAllRounded, SportsRugbySharp } from '@mui/icons-material';

interface postInfo {
    post: {
        elderlyInvolved: string;
        profileImage: string;
        caption: string;
        time: number;
        images: string;
    }
}

export default function posts (props:postInfo) {
    const { post } = props;

    return (
        <Grid item xs={8} md={6}>
            <CardActionArea component="a">
                <Card style={{display: 'flex', width:'800px', height:'400px', position:'absolute', backgroundColor:'rgba(249, 224, 219, 0.50)', borderRadius:'10px', marginLeft:56, marginTop:-30, marginBottom:10}}>
                    <CardContent sx={{flex: 1}}>
                        <CardMedia
                            component="img"
                            sx={{borderRadius: '50%', width: 60, height: 60, marginLeft:1, marginTop: 1}}
                            image={post.profileImage}
                        />
                        <Typography variant='body1' sx={{fontFamily:'Roboto', marginLeft:11, marginTop:-6.5, fontSize:18, fontWeight:500}}>
                            {post.elderlyInvolved}
                        </Typography>
                        <Typography sx={{fontFamily:'Roboto', marginLeft:16.4, marginTop:-3.2}}>
                            {post.caption}
                        </Typography>
                        <Typography sx={{fontFamily:'Roboto', marginLeft:82, marginTop:-3}}>
                            {post.time}
                        </Typography>
                    </CardContent>
                </Card>
            </CardActionArea>
        </Grid>
    );
}