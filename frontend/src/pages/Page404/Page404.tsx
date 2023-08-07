import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export const Page404 = () => {
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
                    Sorry, page not found!
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
                    Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your spelling.
                </Typography>

            </Box>
        </div>

    );
}

