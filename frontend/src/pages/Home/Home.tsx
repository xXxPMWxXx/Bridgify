import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {ResponsiveAppBar} from '../../Navbar';
import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import backgroundImage from '../../images/background.png';
import ElderlyStatus from './elderlyStatus';

const Background = styled("div") ({
    position: 'absolute', 
    width: '100%', 
    height: '45%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat'
})

const elderlyStatuses = [
    {
        name: 'Megan J.',
        image: 'https://t3.ftcdn.net/jpg/00/56/14/04/240_F_56140454_q4nbUmTCcC1ovIJrOL1SxJuaYXwvSz68.jpg',
        status: 'Awake',
        activity: 'Lunch',
        medication: 'Taken',
        condition: 'Fine',
    },
    {
        name: 'Henry.',
        image: 'https://t3.ftcdn.net/jpg/00/56/14/04/240_F_56140454_q4nbUmTCcC1ovIJrOL1SxJuaYXwvSz68.jpg',
        status: 'Awake',
        activity: 'Lunch',
        medication: 'Taken',
        condition: 'Fine',
    },
    {
        name: 'Henry.',
        image: 'https://t3.ftcdn.net/jpg/00/56/14/04/240_F_56140454_q4nbUmTCcC1ovIJrOL1SxJuaYXwvSz68.jpg',
        status: 'Asleep',
        activity: 'Lunch',
        medication: 'Taken',
        condition: 'Fine',
    },
        {
        name: 'Henry.',
        image: 'https://t3.ftcdn.net/jpg/00/56/14/04/240_F_56140454_q4nbUmTCcC1ovIJrOL1SxJuaYXwvSz68.jpg',
        status: 'Asleep',
        activity: 'Lunch',
        medication: 'Taken',
        condition: 'Fine',
    },
];

export const Home = () => {

    useEffect(() => {
    }, []);
    const token = window.localStorage.getItem('accessToken');
    const userName = window.localStorage.getItem('userName');
    const accRole = window.localStorage.getItem('accRole');
    const linkedElderly : any = window.localStorage.getItem('linkedElderly');
    const profileImage = window.localStorage.getItem('profileImage')
    console.log("-----Home-----");
    console.log(token);
    console.log(userName);
    console.log(accRole);
    console.log(linkedElderly);
    console.log(profileImage);
    
    //change linkedElderly to Array
    if(linkedElderly != null){
        var elderlyArray = linkedElderly.split(",");
        console.log(elderlyArray[0])
    }
    

    return (
        <div>
            {
				token == null ?
					<Navigate to="/Login" /> : <Navigate to="/" />
			}
            < ResponsiveAppBar/>
            {/* < Layout/> */}
            {/* < DefaultNavbar/> */}
           
            <Background />

            <div style={{display:'flex', justifyContent:'center'}}>
                <Typography component="h1" align="center" sx={{color:'white', position:'absolute', fontFamily:'Roboto', fontWeight:500, fontSize:45, marginTop:5}}>
                        Welcome!
                </Typography>
            </div>

            <main>
                <Box display='flex' justifyContent='center' alignItems='center' height='60vh' width='100%'>
                    <Grid container spacing={-5} justifyContent="center">
                        {elderlyStatuses.map((post, index) => ( // Add index as the second parameter
                        <Grid item key={post.name} xs={12} sm={6} md={4} lg={3} xl={2} sx={{ marginBottom: (index + 1) % 4 === 0 ? 2 : 0 }}>
                            <ElderlyStatus post={post} />
                        </Grid>
                        ))}
                    </Grid>
                </Box>
            </main>

        </div>
    )
}

