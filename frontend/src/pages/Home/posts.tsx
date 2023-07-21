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
                    <CardContent sx={{flex: 1 }}>
                        <CardMedia
                            component="img"
                            sx={{borderRadius: '50%', width: 60, height: 60, marginLeft:3.5, marginTop: 1}}
                            image={post.profileImage}
                        />
                        <Typography variant='body1' sx={{fontFamily:'Roboto', marginLeft:13.5, marginTop:-5.8, fontSize:18}}>
                            <span style={{fontWeight:500}}>{post.elderlyInvolved}</span> {post.caption}
                        </Typography>
                        <Typography sx={{fontFamily:'Roboto', marginLeft:81.5, marginTop:-3, color:'#909090'}}>
                            {post.time}h ago
                        </Typography>
                        <CardMedia
                            component="img"
                            sx={{borderRadius:'8px', width:600, height:280, marginLeft:12.5, marginTop:3}}
                            image={post.images}
                        />
                    </CardContent>
                </Card>
            </CardActionArea>
        </Grid>
    );
}