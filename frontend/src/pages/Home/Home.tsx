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


export const Home = () => {

    useEffect(() => {
        if(elderly.length === 0){
            const interval  = setInterval(() => elderlyStatuses(), 1000)
            return () => {
                clearInterval(interval);
            }
        }
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

    const[elderly, setElderly]: any[] = useState([]);
    
    //change linkedElderly to Array
    if(linkedElderly != null){
        var elderlyArray = linkedElderly.split(",");
        console.log(elderlyArray[0])
    }

    const elderlyStatuses = async ()=> {
        fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/elderly/getAll`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
            },
            method: 'GET',
          })
            .then(async (response) => {
              if (response.status != 200) {
                window.alert("Error: No elderly linked");
              } else {
      
                console.log("testing");
                const elderlyResponse = await response.json();
                console.log(elderlyResponse);
                for(var i = 0; i < elderlyResponse.length; i++){
                    const statusObj = elderlyResponse[i]['status']
                    
                    const elderlyObj:any = {
                        name: elderlyResponse[i]['name'],
                        image: `http://13.229.138.25:8000/images/trained_face/${elderlyResponse[i]['photo']}`,
                        status: statusObj['awake'],
                        activity: statusObj['current_activity'],
                        medication: 'Taken',
                        condition: statusObj['condition'],
                    }
                    elderly.push(elderlyObj)
                }
                console.log(elderly)
            }
      
            })
            .catch((err) => {
              window.alert(err);
            });
    }
    

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
                <Typography component="h1" align="center" sx={{color:'white', position:'absolute', fontFamily:'Roboto', fontWeight:500, fontSize:45, marginTop:5}}>
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

        </div>
    )
}

