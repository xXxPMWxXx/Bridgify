import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {ResponsiveAppBar} from '../../Navbar';
import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import backgroundImage from '../../images/background.png';
import ElderlyStatus from './elderlyStatus';
import Posts from './posts';
import Notifications from './notifications';

const Background = styled("div") ({
    position: 'absolute', 
    width: '100%', 
    height: '45%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat'
})

const notifs =[
    {
        image: 'https://t3.ftcdn.net/jpg/00/56/14/04/240_F_56140454_q4nbUmTCcC1ovIJrOL1SxJuaYXwvSz68.jpg',
        sender: 'Ruby B.',
        message: 'condition has been updated to a little sick',
        time: 2
    },
]


export const Home = () => {

    useEffect(() => {
        elderlyStatuses();
        getPosts();
    }, []);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertType, setAlertType]: any = useState('info');
    const [alertMsg, setAlertMsg] = useState('');
    const [open, setOpen] = useState(false);

    // const linkedElderly = window.localStorage.getItem('linkedElderly')
    const token = window.localStorage.getItem('accessToken');
    const userName = window.localStorage.getItem('userName');
    const accRole = window.localStorage.getItem('accRole');
    const profileImage = window.localStorage.getItem('profileImage');
    const email = window.localStorage.getItem('email');


    console.log("-----Home-----");
    console.log(token);
    console.log(userName);
    console.log(accRole);
    // console.log(linkedElderly);
    console.log(profileImage);
    console.log(email);

    const[elderly, setElderly]: any[] = useState([]);
    const[posts, setPosts]: any[] = useState([]);
    
    //change linkedElderly to Array
    // if(linkedElderly != null){
    //     var elderlyArray = linkedElderly.split(",");
    //     // console.log(elderlyArray[0])
    // }

    //for the elderlyStatus popup
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const elderlyStatuses = async () => {
        try {
          const APImethod = 'getByUser';
      
          const response = await fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/elderly/${APImethod}?email=${email}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            method: 'GET',
          });
          
          if (!response.ok) {
            const apiResponse = await response.json();
            // Show alert message
            setOpenSnackbar(true);
            setAlertType('error');
            setAlertMsg(apiResponse['message']);
            return;
          }

          const elderlyResponse = await response.json();
         //console.log(elderlyResponse);
          const elderlyArray = elderlyResponse.map((elderly: any) => ({
            id: elderly.id,
            name: elderly.name,
            image: `${process.env.REACT_APP_BACKEND_IMAGES_URL}/trained_face/${elderly.photo}`,
            status: elderly.status.awake === 'True' ? 'Awake' : 'Asleep',
            activity: elderly.status.current_activity,
            medication: elderly.status.taken_med === 'True' ? 'Taken' : 'Not Taken',
            condition: elderly.status.condition,
          }));
          
          console.log("statuscheck");
          console.log(elderlyArray);
          setElderly(elderlyArray);
        } catch (error) {
          console.error('Error fetching linked elderly:', error);
          window.alert('Error: Failed to fetch linked elderly');
        }
      };

      const getPosts = async () => {
        try {
            const APImethod = 'getByUser';

            const response = await fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/post/${APImethod}?email=${email}`, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                },
                method: 'GET',
            });

            if (!response.ok) {
                const apiResponse = await response.json();
                return;
            }

            const postResponse = await response.json();
            console.log('---------Post--------');
            console.log(postResponse);

            const postArray = postResponse.map((post: any) => ({
                id: post.id,
                elderlyInvolved: post.elderlyInvolved,
                //profileImage: null,
                caption: post.activity_type,
                time: post.dateTime,
                imagesCount: post.imagesCount,
                images: post.postImages,
                description: post.description,
                // elderlyInvolvedArray: postArray.map((postItem: any) => postItem.elderlyInvolved),
                // imagesArray: postArray.map((postItem: any) => postItem.images),
            }));

            const elderlyInvolvedArray = postArray.map((postItem: any) => postItem.elderlyInvolved);
            console.log(elderlyInvolvedArray)
            const imagesArray = postArray.map((postItem: any) => postItem.images);
            setPosts(postArray);

            // console.log("elderlyInvolvedArray");
            // console.log(elderlyInvolvedArray);
            // console.log("imagesArray");
            // console.log(imagesArray);

        } catch (error) {
            console.error('Error fetching', error);
            window.alert('Error: Failed to fetch');
        }
    };
    

    return (
        <div>
            {
				token == null ?
					<Navigate to="/Login" /> : <Navigate to="/Home" />
			}
            < ResponsiveAppBar/>
            {/* < Layout/> */}
            {/* < DefaultNavbar/> */}
           
            <Background />

            <div style={{display:'flex', justifyContent:'center'}}>
                <Typography component="h1" align="center" sx={{color:'white', position:'absolute', fontFamily:'Roboto', fontWeight:500, fontSize:42, marginTop:5}}>
                        Welcome!
                </Typography>
            </div>

            <main>
                <Box display='flex' justifyContent='center' alignItems='center' height='60vh' width='100%'>
                    <Grid container spacing={-5} justifyContent="center">
                        {elderly.map((post:any) => ( // Add index as the second parameter
                        <Grid item key={post.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                            <ElderlyStatus post={post} onClick={handleOpen}/>
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>{"Elderly Health Information"}</DialogTitle>
                                <DialogContent>
                                    
                                </DialogContent>
                            </Dialog>
                        </Grid>
                        ))}
                    </Grid>
                </Box>
            </main>

            <div>
                <Typography component="h2" align="left" alignItems="left" sx={{color:'black', position:'absolute', fontFamily:'Roboto', fontWeight:500, fontSize:22, marginLeft:9, marginTop:-9}}>
                    Posts
                </Typography>
            </div>

            <main>
                <Box width='70%'>
                    <Grid container spacing={54} flexDirection='column'>
                        {posts.map((post:any) => (
                        <Grid item key={post.id}> {/* Use post.id as the key */}
                            <Posts
                                post={post}
                                elderlyInvolvedArray={post.elderlyInvolved} // Use the actual property from the post object
                                imagesArray={post.images} // Use the actual property from the post object
                            />
                        </Grid>
                        ))}
                    </Grid>
                </Box>
            </main>

            <main>
                
            </main>

        </div>
    )
}

