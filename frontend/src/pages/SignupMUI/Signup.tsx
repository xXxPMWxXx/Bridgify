import * as React from 'react';
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
import backgroundImage from './images/logInBackground.jpeg';
import logo from './images/icon.png'

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

export default function SignInSide() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    
    <ThemeProvider theme={myTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
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
                <a href='/logIn'>
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
            <Typography component="h1" variant="h5" sx={{fontWeight: 'bold', fontSize: 45, letterSpacing: -2, marginTop: 11, marginBottom: 1}}>
              Create your account
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="Name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                size="medium"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="Email"
                label="Email"
                name="Email"
                autoComplete="email"
                autoFocus
                size="medium"
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
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor:'black' }}
              >
                Create Account
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/logIn" variant="body2">
                    {"Already have an account? Log In"}
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