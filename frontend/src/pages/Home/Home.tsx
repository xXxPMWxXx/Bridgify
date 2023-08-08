import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ResponsiveAppBar } from '../../Navbar';
import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import backgroundImage from '../../images/background.png';
import ElderlyStatus from './elderlyStatus';
import Posts from './posts';
import Notifications from './notifications';
import DisplayElderly from './displayElderly';

// background styling
const Background = styled("div")({
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
        elderlyStatuses();
        getPosts();
    }, []);

    const userName = window.localStorage.getItem('userName');
    const token = window.localStorage.getItem('accessToken');
    const email = window.localStorage.getItem('email');
    const [elderly, setElderly]: any[] = useState([]);
    const [posts, setPosts]: any[] = useState([]);
    const [displayOpen, setdisplayOpen] = React.useState(false);
    const [selectedElderlyStatus, setSelectedElderlyStatus]: any[] = useState([]);

    //for the elderlyStatus popup
    const handleOpenElderlyDetails = (selectedElderly:any) => {
        setdisplayOpen(true);
        setSelectedElderlyStatus(selectedElderly);
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
                return;
            }

            //getting the elderly information of each linked elderly
            const elderlyResponse = await response.json();
            const elderlyArray = elderlyResponse.map((elderly: any) => ({
                id: elderly.id,
                name: elderly.name,
                image: `${process.env.REACT_APP_BACKEND_IMAGES_URL}/trained_face/${elderly.photo}`,
                status: elderly.status.awake.toUpperCase() === 'TRUE' ? 'Awake' : 'Asleep',
                activity: elderly.status.current_activity,
                medication: elderly.status.taken_med.toUpperCase() === 'TRUE' ? 'Taken' : 'Not Taken',
                condition: elderly.status.condition,
                elderlyData: elderly
            }));
            setElderly(elderlyArray);
        } catch (error) {
            
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

            //getting post information
            const postArray = postResponse.map((post: any) => ({
                id: post.id,
                elderlyInvolved: post.elderlyInvolved,
                caption: post.activity_type,
                time: post.dateTime,
                imagesCount: post.imagesCount,
                images: post.postImages,
                description: post.description,
            }));

            const elderlyInvolvedArray = postArray.map((postItem: any) => postItem.elderlyInvolved);
            const imagesArray = postArray.map((postItem: any) => postItem.images);
            setPosts(postArray);

        } catch (error) {
            console.error('Error fetching', error);
        }
    };


    return (
        <div>
            {
                token == null ?
                    <Navigate to="/Login" /> : <Navigate to="/Home" />
            }
            < ResponsiveAppBar />

            <Background />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography component="h1" align="center" sx={{ color: 'white', position: 'absolute', fontFamily: 'Roboto', fontWeight: 500, fontSize: 42, marginTop: 5 }}>
                    Welcome, {userName}!
                </Typography>
            </div>

            {/* display elderly status */}
            <main>
                <Box display='flex' justifyContent='center' alignItems='center' height='60vh' width='100%'>
                    <Grid container spacing={-5} justifyContent="center">

                        {elderly.length > 0 ? 
                                elderly.map((elderly: any) => (
                                <Grid item key={elderly.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                                    <ElderlyStatus post={elderly} onClick={()=>handleOpenElderlyDetails(elderly.elderlyData)} />
                                    {displayOpen ?
                                        <DisplayElderly open={setdisplayOpen} elderly={selectedElderlyStatus} />

                                        : null}
                                </Grid>
                        )) : (<Typography textAlign={'center'} fontSize={"28px"} color={"#ADADAD"} sx={{zIndex:1, marginTop:-3, marginLeft:2.5}}>No Linked Elderly</Typography>)}
                    </Grid>
                </Box>
            </main>

            {/* display posts */}
            <div>
                <Typography component="h2" align="left" alignItems="left" sx={{ color: 'black', position: 'absolute', fontFamily: 'Roboto', fontWeight: 500, fontSize: 22, marginLeft: 15, marginTop: -9 }}>
                    Posts
                </Typography>
            </div>

            <main style={{marginLeft:40}}>
                <Grid container spacing={2} sx={{marginBottom:20}}>
                    <Grid item xs={8}>
                        <Box width='70%'>
                            <Grid container spacing={56} flexDirection='column'>
                                {posts.map((post: any) => (
                                    <Grid item key={post.id}> 
                                        <Posts
                                            post={post}
                                            elderlyInvolvedArray={post.elderlyInvolved}
                                            imagesArray={post.images} 
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>

                    {/* display notifications */}
                    <Grid item xs={4}>
                        <Box>
                            <Notifications />
                        </Box>
                    </Grid>
                </Grid>
            </main>

        </div>
    )
}

