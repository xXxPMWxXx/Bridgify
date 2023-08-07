import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Navigate, useNavigate } from 'react-router-dom';

export const Forbidden = () => {
    let navigate = useNavigate();
    const handleClick = (e: any) => {
        navigate('/');
    }

    return (
        <div>
            <Button key='Home' onClick={handleClick} sx={{ my: 2, color: 'red', display: 'block' }} ><u>back</u></Button>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',

                }}
            >
                <Typography align="center" variant='h3' paragraph>
                    403 Forbidden Error
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography align="center" variant='h5'>
                    Sorry, You don’t have permission to access the page!
                </Typography>

            </Box>
        </div>

    );
}

