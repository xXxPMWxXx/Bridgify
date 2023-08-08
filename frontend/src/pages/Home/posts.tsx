import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Avatar, AvatarGroup, CardContent, MobileStepper } from '@mui/material';
import { Button, Card } from 'react-bootstrap';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useTheme } from '@mui/material/styles';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


interface postInfo {
  post: {
    id: string;
    elderlyInvolved: string;
    caption: string;
    time: string;
    imagesCount: number;
    images: string;
    description: string;
  }
}

interface PostProps extends postInfo {
  elderlyInvolvedArray: string[];
  imagesArray: string[];
}


export default function Posts(props: PostProps) {
  const { post, elderlyInvolvedArray, imagesArray } = props;

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
    console.log("showing")
    setenlargeImg(true);
  };
  const handleCloseDialog = () => {
    console.log("closing")
    setenlargeImg(false);
  };

  //TEST


  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = imagesArray.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };
  

  return (
    <Grid item xs={8} md={6}>
      <Card style={{ display: 'flex', width: '780px', height: '435px', position: 'absolute', backgroundColor: 'rgba(249, 224, 219, 0.50)', borderRadius: '10px', marginLeft: 56, marginTop: -30, marginBottom: 10 }}>
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
          {elderlyInvolvedArray.length > 1 ? <Typography variant='body1' sx={{ fontFamily: 'Roboto', marginLeft: 17.4, marginTop: -4.6, fontSize: 18 }}>

            <span style={{ fontWeight: 500 }}>{elderlyInvolvedArray[0].split(/[()]/)[0]}</span>, <span style={{ fontWeight: 500 }}>{elderlyInvolvedArray[1].split(/[()]/)[0]}</span> and more are {post.caption}
          </Typography> : <Typography variant='body1' sx={{ fontFamily: 'Roboto', marginLeft: 17.4, marginTop: -4.6, fontSize: 18 }}>

            <span style={{ fontWeight: 500 }}>{elderlyInvolvedArray[0].split(/[()]/)[0]}</span> is {post.caption}
          </Typography>}

          <Typography sx={{ fontFamily: 'Roboto', marginLeft: 77.5, marginTop: -3, color: '#909090' }}>
            {getTimeElapsed(post.time)}
          </Typography>
          <Typography sx={{ fontFamily: 'Roboto', marginLeft: 17.4, fontSize: 16 }}>
            {post.description}
          </Typography>

          <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          style={{marginLeft:138, marginTop:15}}
          >
            {imagesArray.map((image, index) => (
              <div key={image}>
                {Math.abs(activeStep - index) <= 2? (
                  <Box
                    component="img"
                    sx={{
                      height: 275,
                      display: 'block',
                      maxWidth: 400,
                      overflow: 'hidden',
                      width: '100%',
                    }}
                    src={`${process.env.REACT_APP_BACKEND_IMAGES_URL}/post/${image}?w=200&h=200&fit=crop&auto=format`}
                    alt="image"
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        style={{backgroundColor:'transparent', width:'230px', marginLeft:220}}
        nextButton={
          <Button
            size="sm"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            style={{borderRadius:'100%', backgroundColor:'transparent', color:'black', borderColor:'transparent'}}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button 
            size="sm" 
            onClick={handleBack} 
            disabled={activeStep === 0}
            style={{borderRadius:'100%', backgroundColor:'transparent', color:'black', borderColor:'transparent'}}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />

        </CardContent>
      </Card>

    </Grid>
  );
}