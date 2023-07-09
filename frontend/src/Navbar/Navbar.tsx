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
import icon from '../images/icon.png';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const ResponsiveAppBar = () => {
    let navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

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
        localStorage.removeItem('linedElderly');
        localStorage.removeItem('profileImage');
        navigate('/login');
    };

    const handleHealth = () => {
        navigate('/health');
    }

    const handleHelp = () => {
        navigate('/help');
    }

    const handleHome = () => {
        navigate('/');
    }

    const handleMessage = () => {
        navigate('/message');
    }

    const handleProfile = () => {
        navigate('/profile');
    }

    const handleSetting = () => {
        navigate('/setting');
    }

    return (
        <AppBar position="static" style={{ background: '#588061' }} >
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    {/* <img src={icon} alt="Logo" width={35} height={35}/> */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
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
                            <Button key='Message' onClick={handleMessage} sx={{ my: 0, color: 'black', display: 'block' }} >Message</Button>
                            <Button key='Profile' onClick={handleProfile} sx={{ my: 0, color: 'black', display: 'block' }} >Profile</Button>
                            <Button key='Setting' onClick={handleSetting} sx={{ my: 0, color: 'black', display: 'block' }} >Setting</Button>
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Bridgify
                    </Typography>

                    <Box justifyContent="center" alignItems="center" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button key='Home' onClick={handleHome} sx={{ my: 2, color: 'white', display: 'block' }} >Home</Button>
                        <Button key='Health' onClick={handleHealth} sx={{ my: 2, color: 'white', display: 'block' }} >Health</Button>
                        <Button key='Message' onClick={handleMessage} sx={{ my: 2, color: 'white', display: 'block' }} >Message</Button>
                        <Button key='Profile' onClick={handleProfile} sx={{ my: 2, color: 'white', display: 'block' }} >Profile</Button>
                        <Button key='Setting' onClick={handleSetting} sx={{ my: 2, color: 'white', display: 'block' }} >Setting</Button>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                            <MenuItem key='Setting' onClick={handleSetting}>
                                <Typography textAlign="center">Setting</Typography>
                            </MenuItem>
                            <MenuItem key='Help' onClick={handleHelp}>
                                <Typography textAlign="center">Help</Typography>
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
