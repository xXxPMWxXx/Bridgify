import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import logo from '../images/icon-white.png';

export const ResponsiveAppBar = () => {
    let navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


    let profileImage: any = window.localStorage.getItem('profileImage');
    const profileImageSrc = `${process.env.REACT_APP_BACKEND_IMAGES_URL}/user_profile/${profileImage}`;


    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handledLogout = () => {
        setAnchorElUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('accRole');
        localStorage.removeItem('linkedElderly');
        localStorage.removeItem('profileImage');
        navigate('/login');
    };

    const handleHealth = () => {
        navigate('/health');
    }

    const handleHome = () => {
        navigate('/Home');
    }

    const handleProfile = () => {
        navigate('/profile');
    }

    const handleAbout = () => {
        navigate('/about');
    }

    return (
        <AppBar position="sticky" style={{ background: '#30685E' }} >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* need to research on how to get rid of this logo when hamburger bar opens */}
                    <img src={logo} alt="Logo" width={50} height={50} style={{ marginLeft: 5, marginRight: 8 }}></img>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/Home"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Roboto',
                            fontWeight: 500,
                            letterSpacing: 0,
                            color: 'inherit',
                            textDecoration: 'none',
                            fontSize: 15,
                            marginLeft: -1.3
                        }}
                    >
                        Bridgify
                    </Typography>


                    {/* for hamburger bar */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <Button key='Home' onClick={handleHome} sx={{ my: 0, color: 'black', display: 'block' }} >Home</Button>
                            <Button key='Health' onClick={handleHealth} sx={{ my: 0, color: 'black', display: 'block' }} >Health</Button>
                            <Button key='Profile' onClick={handleProfile} sx={{ my: 0, color: 'black', display: 'block' }} >Profile</Button>
                            <Button key='About' onClick={handleAbout} sx={{ my: 0, color: 'black', display: 'block' }} >About</Button>
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'Roboto',
                            fontWeight: 700,
                            letterSpacing: 0,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Bridgify
                    </Typography>

                    <Box justifyContent="center" alignItems="center" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button key='Home' onClick={handleHome} sx={{ my: 2, color: 'white', display: 'block' }} >Home</Button>
                        <Button key='Health' onClick={handleHealth} sx={{ my: 2, color: 'white', display: 'block' }} >Health</Button>
                        <Button key='Profile' onClick={handleProfile} sx={{ my: 2, color: 'white', display: 'block' }} >Profile</Button>
                        <Button key='About' onClick={handleAbout} sx={{ my: 2, color: 'white', display: 'block' }} >About</Button>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src={profileImageSrc} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key='Profile' onClick={handleProfile}>
                                <Typography textAlign="center">Profile</Typography>
                            </MenuItem>
                            <MenuItem key='Health' onClick={handleHealth}>
                                <Typography textAlign="center">Health</Typography>
                            </MenuItem>
                            <MenuItem key='About' onClick={handleAbout}>
                                <Typography textAlign="center">About</Typography>
                            </MenuItem>
                            <MenuItem key='Logout' onClick={handledLogout}>
                                <Typography textAlign="center">Log out</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export const ResponsiveAppBarAdmin = () => {
    let navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


    let profileImage: any = window.localStorage.getItem('profileImage');
    const profileImageSrc = `${process.env.REACT_APP_BACKEND_IMAGES_URL}/user_profile/${profileImage}`;


    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handledLogout = () => {
        setAnchorElUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('accRole');
        localStorage.removeItem('linkedElderly');
        localStorage.removeItem('profileImage');
        navigate('/login');
    };

    const handleHomeAdmin = () => {
        navigate('/Home-admin');
    }

    const handleElderlyAdmin = () => {
        navigate('/Elderly-admin');
    }

    const handlePostAdmin = () => {
        navigate('/Post-admin');
    }

    const handleRecordAdmin = () => {
        navigate('/Record-admin');
    }




    return (
        <AppBar position="sticky" style={{ background: '#30685E' }} >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img src={logo} alt="Logo" width={50} height={50} style={{ marginLeft: 5, marginRight: 8 }}></img>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/Home-admin"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Roboto',
                            fontWeight: 500,
                            letterSpacing: 0,
                            color: 'inherit',
                            textDecoration: 'none',
                            fontSize: 15,
                            marginLeft: -1.3
                        }}
                    >
                        Bridgify
                    </Typography>


                    {/* for hamburger bar */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <Button key='Home' onClick={handleHomeAdmin} sx={{ my: 0, color: 'black', display: 'block' }} >Home</Button>
                            <Button key='Elderly' onClick={handleElderlyAdmin} sx={{ my: 0, color: 'black', display: 'block' }} >Elderly</Button>
                            <Button key='Post' onClick={handlePostAdmin} sx={{ my: 0, color: 'black', display: 'block' }} >Post</Button>
                            <Button key='Record' onClick={handleRecordAdmin} sx={{ my: 0, color: 'black', display: 'block' }} >Records</Button>

                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'Roboto',
                            fontWeight: 700,
                            letterSpacing: 0,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Bridgify
                    </Typography>

                    <Box justifyContent="center" alignItems="center" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button key='Home' onClick={handleHomeAdmin} sx={{ my: 2, color: 'white', display: 'block' }} >Home</Button>
                        <Button key='Elderly' onClick={handleElderlyAdmin} sx={{ my: 2, color: 'white', display: 'block' }} >Elderly</Button>
                        <Button key='Post' onClick={handlePostAdmin} sx={{ my: 2, color: 'white', display: 'block' }} >Post</Button>
                        <Button key='Record' onClick={handleRecordAdmin} sx={{ my: 2, color: 'white', display: 'block' }} >Record</Button>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src={profileImageSrc} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key='Elderly' onClick={handleElderlyAdmin}>
                                <Typography textAlign="center">Elderly</Typography>
                            </MenuItem>
                            <MenuItem key='Post' onClick={handlePostAdmin}>
                                <Typography textAlign="center">Post</Typography>
                            </MenuItem>
                            <MenuItem key='Record' onClick={handleRecordAdmin}>
                                <Typography textAlign="center">Record</Typography>
                            </MenuItem>
                            <MenuItem key='Logout' onClick={handledLogout}>
                                <Typography textAlign="center">Log out</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}