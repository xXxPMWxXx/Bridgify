import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {ResponsiveAppBar} from '../../Navbar';
import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import backgroundImage from '../../images/background.png';
import ElderlyStatus from './elderlyStatus';
import Posts from './posts';

const Background = styled("div") ({
    position: 'absolute', 
    width: '100%', 
    height: '45%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat'
})

const posts = [
    {
        elderlyInvolved: 'Amy',
        profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLP-Khig_cQdjFjvvyq73E4SZ6hqJBtcqjlEH-L9kUFg&s',
        caption: 'was captured in a picture during lunch',
        time: 2,
        images:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLP-Khig_cQdjFjvvyq73E4SZ6hqJBtcqjlEH-L9kUFg&s',
    },
]


export const Home = () => {

    useEffect(() => {
        elderlyStatuses();
    }, []);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertType, setAlertType]: any = useState('info');
    const [alertMsg, setAlertMsg] = useState('');

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
    
    //change linkedElderly to Array
    // if(linkedElderly != null){
    //     var elderlyArray = linkedElderly.split(",");
    //     // console.log(elderlyArray[0])
    // }

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
        //   console.log(elderlyResponse);
          const elderlyArray = elderlyResponse.map((elderly: any) => ({
            name: elderly.name,
            image: `${process.env.REACT_APP_BACKEND_IMAGES_URL}/trained_face/${elderly.photo}`,
            status: elderly.status.awake === 'True' ? 'Awake' : 'Asleep',
            activity: elderly.status.current_activity,
            medication: elderly.status.taken_med === 'True' ? 'Taken' : 'Not Taken',
            condition: elderly.status.condition,
          }));
          
          setElderly(elderlyArray);
        } catch (error) {
          console.error('Error fetching linked elderly:', error);
          window.alert('Error: Failed to fetch linked elderly');
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
                        <Grid item key={post.name} xs={12} sm={6} md={4} lg={3} xl={2}>
                            <ElderlyStatus post={post} />
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
                <Box display='flex' justifyContent='left' alignItems='left' width='70%'>
                    <Grid>
                        {posts.map((post:any) => (
                            <Grid item key={post.elderlyInvolved}>
                                <Posts post={post} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </main>

        </div>
    )
}

