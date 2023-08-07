import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { Avatar, AvatarGroup, CardActionArea, CardContent, CardMedia, ImageList, ImageListItem, Modal } from '@mui/material';
import { Card } from 'react-bootstrap';
import { BorderAllRounded, SportsRugbySharp } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';
import CarouselSlide from 'react-material-ui-carousel';

interface postInfo {
  post: {
    id: string;
    elderlyInvolved: string;
    //profileImage: string;
    caption: string;
    time: string;
    imagesCount: number;
    images: string;
    description: string;
  }
}

// interface elderlyInfo {
//     elderlyID: string;
//     name: string;
//     image: string;
// }

interface PostProps extends postInfo {
  elderlyInvolvedArray: string[];
  imagesArray: string[];
}

// async function getElderlyInfo(elderlyName: string): Promise<elderlyInfo | null> {
//   try {
//     const response = await fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/elderly?name=${elderlyName}`)
//     if(!response.ok) {
//       throw new Error('Failed to fetch elderly information');
//     }
//     const data = await response.json();
//     return data;
//   } catch(error) {
//     console.error('Error while fetching elderly information:', error);
//     throw error;
//   }
// }


export default function Posts(props: PostProps) {
  const { post, elderlyInvolvedArray, imagesArray } = props;

  console.log(post);

  //get all the profileImages of the elderly involved
  //need split as the format is like: Amy(123A)
  // it will split to ['Amy','123A',''];
  const elderlyInvolvedImageArray = elderlyInvolvedArray!.map((elderlyName: any) => ({
    name: elderlyName.split(/[()]/)[0],
    image: `${process.env.REACT_APP_BACKEND_IMAGES_URL}/trained_face/${elderlyName.split(/[()]/)[1]}.png`,
  }));

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

  const [enlargeImg, setenlargeImg] = React.useState(false);
  const handleShowDialog = () => {
    setenlargeImg(true);
  };
  const handleCloseDialog = () => {
    setenlargeImg(false);
  };

  return (
    <Grid item xs={8} md={6}>
      <CardActionArea component="a">
        <Card style={{ display: 'flex', width: '800px', height: '415px', position: 'absolute', backgroundColor: 'rgba(249, 224, 219, 0.50)', borderRadius: '10px', marginLeft: 56, marginTop: -30, marginBottom: 10 }}>
          <CardContent sx={{ flex: 1 }}>
            <div style={{ marginRight: 640, marginTop: 10 }}>
              <AvatarGroup max={3}>
                {elderlyInvolvedImageArray.map((elderly, index) => (
                  <Avatar
                    key={index}
                    alt={elderly.name}
                    src={elderly.image}
                  />
                ))}
              </AvatarGroup>
            </div>
            <Typography variant='body1' sx={{ fontFamily: 'Roboto', marginLeft: 17.4, marginTop: -4.6, fontSize: 18 }}>
              <span style={{ fontWeight: 500 }}>{elderlyInvolvedArray[0]}</span>, <span style={{ fontWeight: 500 }}>{elderlyInvolvedArray[1]}</span> and more are {post.caption}
            </Typography>
            <Typography sx={{ fontFamily: 'Roboto', marginLeft: 81.5, marginTop: -3, color: '#909090' }}>
              {getTimeElapsed(post.time)}
            </Typography>
            <Typography sx={{ fontFamily: 'Roboto', marginLeft: 17.4, fontSize: 16 }}>
              {post.description}
            </Typography>

            {/* <ImageList sx={{ width: 500, height: 450, marginLeft: 17, marginTop: 2.8, gap: 2 }} cols={2} rowHeight={104}>
              {imagesArray.map((image, index) => (
                <ImageListItem key={index}>
                  <img
                    src={`${process.env.REACT_APP_BACKEND_IMAGES_URL}/post/${image}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${process.env.REACT_APP_BACKEND_IMAGES_URL}/post/${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    loading='lazy'
                    alt={`Image ${index + 1}`}
                  />
                </ImageListItem>
              ))}
            </ImageList> */}
            <Carousel sx={{ maxHeight: 300, height: '100%', maxWidth: 650, width: '100%', mt: 5 }}>
              {imagesArray.map((imgName: any) => (
                <CarouselSlide key={imgName} >
                  <Card >
                    <CardMedia
                      image={`${process.env.REACT_APP_BACKEND_IMAGES_URL}/post/${imgName}`}
                      sx={{ height: 250, objectFit: 'inherit' }}
                      onClick={handleShowDialog}
                    />
                    {enlargeImg && (
                      <Modal
                        open={enlargeImg}
                        onClose={handleCloseDialog}
                        aria-labelledby="modal-title"
                        aria-describedby="modal-description"
                      >
                        <Box sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          bgcolor: 'background.paper',
                          boxShadow: 24,
                          p: 4,
                          maxWidth: '80%',
                          maxHeight: '80vh', 
                          overflow: 'auto',
                        }}>
                          <img
                            className="image"
                            src={`${process.env.REACT_APP_BACKEND_IMAGES_URL}/post/${imgName}`}
                            onClick={handleShowDialog}
                            alt="no image"
                          />
                        </Box>
                      </Modal>
                    )}
                  </Card>
                  
                </CarouselSlide>

                
              ))}
            </Carousel>
          </CardContent>
        </Card>
      </CardActionArea>

    </Grid>
  );
}