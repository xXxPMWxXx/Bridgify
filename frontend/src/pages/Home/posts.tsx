import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { Avatar, AvatarGroup, CardActionArea, CardContent, CardMedia } from '@mui/material';
import { Card } from 'react-bootstrap';
import { BorderAllRounded, SportsRugbySharp } from '@mui/icons-material';

interface postInfo {
    post: {
        id: string;
        elderlyInvolved: string;
        //profileImage: string;
        caption: string;
        time: string;
        imagesCount: number;
        images: string;
    }
}

interface PostProps extends postInfo {
    elderlyInvolvedArray: string[];
    imagesArray: string[];
}

export default function Posts (props:PostProps) {
    const { post, elderlyInvolvedArray, imagesArray } = props;

    //get all the profileImages of the elderly involved
    const elderlyInvolvedImageArray = elderlyInvolvedArray!.map((elderlyName: any) => ({
        name: elderlyName,
        image: `${process.env.REACT_APP_BACKEND_IMAGES_URL}/trained_face/${elderlyName.photo}`,
    }));
    console.log("check");
    console.log(elderlyInvolvedImageArray);

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
        return `${daysDiff} days ago`;
    }

    return (
        <Grid item xs={8} md={6}>
          <CardActionArea component="a">
            <Card style={{display: 'flex', width:'800px', height:'400px', position:'absolute', backgroundColor:'rgba(249, 224, 219, 0.50)', borderRadius:'10px', marginLeft:56, marginTop:-30, marginBottom:10}}>
              <CardContent sx={{flex: 1 }}>
                <AvatarGroup max={3}>
                  {elderlyInvolvedImageArray!.map((elderly, index) => (
                    <Avatar
                      key={index}
                      alt={elderly.name}
                      src={elderly.image}
                    />
                  ))}
                </AvatarGroup>
                <Typography variant='body1' sx={{fontFamily:'Roboto', marginLeft:13.5, marginTop:-5.8, fontSize:18}}>
                  <span style={{fontWeight:500}}>{elderlyInvolvedArray[0]}</span> {post.caption}
                </Typography>
                <Typography sx={{fontFamily:'Roboto', marginLeft:81.5, marginTop:-3, color:'#909090'}}>
                  {getTimeElapsed(post.time)}
                </Typography>
                <CardMedia
                  component="img"
                  sx={{borderRadius:'8px', width:600, height:280, marginLeft:12.5, marginTop:3}}
                  image={imagesArray[0]}
                />
              </CardContent>
            </Card>
          </CardActionArea>
        </Grid>
      );
}