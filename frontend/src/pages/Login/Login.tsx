import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { borders } from '@mui/system';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import backgroundImage from '../../images/logInBackground.jpeg';
import logo from '../../images/icon.png';
import { useNavigate } from 'react-router-dom';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Bridgify
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
//const defaultTheme = createTheme();
const myTheme = createTheme({
    palette: {
        background:{
            default: '#FEF9F9'
        }
    }
});

// const { palette } = createTheme();
// const { augmentColor } = palette;
// const createColor = (mainColor) => augmentColor({color: { main: mainColor }});
// const theme = createTheme({
//     palette: {
//         darkGreen: createColor('#588061'),
//         lightPink :createColor('#FEF9F9'),
//         pink: createColor('#E7B5AC'),
//     },
// });

export function Login() {

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

  let navigate = useNavigate(); 
    
    //to store the input, need set onChange on the html code also
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (e: any) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e: any) => {
        setPassword(e.target.value);
    }
    const loginHandler = async () => {
        // //calling backend API
        fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/user/login`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                "email" : email,
                "password" : password,
            })
        })
            .then(async (response) => {
                if(response.status != 200) {
                    window.alert("Email/Password invalid!");
                }else {
                    
                    const loginResponse = await response.json();
                    const data = loginResponse.data;
                    console.log(data);
                    //pass the info to the local storage, so other page can access them
                    localStorage.setItem('accessToken', data.accessToken);
                    localStorage.setItem('userName', data.name);
                    localStorage.setItem('accRole', data.accRole);
                    localStorage.setItem('linkedElderly', data.linkedElderly);
                    localStorage.setItem('profileImage', data.profileImage);
                    navigate('/');

                }
                
            })
            .catch((err) => {
                window.alert(err);
            });

    }

  return (
    
    <ThemeProvider theme={myTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{display: 'flex', alignItems: 'left', flexWrap: 'wrap', justifyContent:'flex-start'}}>
                <a href='/Login'>
                <img src={logo} alt="Logo" width={28} height={28} style={{marginLeft:-230, marginTop:-5, position:'absolute'}}/>
                <span style={{color:'black', fontSize:15, textAlign:'left', marginTop:-1.5, marginLeft:-195, fontWeight:500, position:'absolute'}}>Bridgify</span>
                </a>
                <Button
                type="submit"
                variant="outlined"
                color='inherit'
                sx={{ mt: 3, mb: 2 , fontWeight:500, borderRadius:8, position: 'absolute', top:30, right:80}}
              >
                Admin
              </Button>
            </div>
            <Typography component="h1" variant="h5" sx={{fontWeight: 'bold', fontSize: 55, letterSpacing: -2, marginTop: 8, marginBottom: -1.5}}>
              Hi there!
            </Typography>
            <Typography sx={{fontWeight: 500, marginBottom: 3}}>
                Welcome to Bridgify
            </Typography>
            <Box component="form" noValidate onSubmit={loginHandler} sx={{ mt: 1}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleEmail}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlePassword}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor:'black' }}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}