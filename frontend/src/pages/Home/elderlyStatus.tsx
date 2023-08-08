import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardContent, CardMedia } from '@mui/material';
import { Card } from 'react-bootstrap';
import awakeIcon from '../../images/awakeStatus.png';
import asleepIcon from '../../images/asleepStatus.png';

interface elderlyStatusInfo {
    post: {
        id: string;
        name: string;
        image: string;
        status: string;
        activity: string;
        medication: string;
        condition: string;
    };
    onClick: () => void;
}

export default function ElderlyStatus(props: elderlyStatusInfo) {
    const { post, onClick } = props;

    return (
        <div onClick={onClick}>
            <Grid item xs={5} md={6}>
                <Card style={{
                    display: 'flex', width: 330, height: 145, backgroundColor: 'rgba(249, 224, 219, 0.80)', borderRadius: '10px', marginLeft: 20, marginTop: 12, cursor: "pointer"
                }}>
                    <CardContent sx={{ flex: 1, border: 'none' }}>
                        <CardMedia
                            component="img"
                            sx={{ borderRadius: '50%', width: 70, height: 70, marginBottom: 0, marginTop: -4.5, marginLeft: 1 }}
                            image={post.image}
                        />
                        <Typography component="h2" variant="h5" sx={{ fontSize: 16, fontFamily: 'Roboto', fontColor: 'Black', fontWeight: 600, marginLeft: 11.7, marginTop: -4.2 }}>
                            {post.name}
                        </Typography>
                        <Card style={{ display: 'flex', width: 80, height: 25, backgroundColor: '#F9E0DB', borderRadius: '10px', marginLeft: 212, marginTop: -22 }}>
                            <CardMedia
                                component="img"
                                sx={{ display: 'flex', position: 'absolute', width: 13, marginLeft: 1.15, marginTop: 0.8, border: 'none' }}
                                image={post.status === 'Awake' ? awakeIcon : asleepIcon}
                            />
                            <Typography variant="subtitle1" sx={{ fontFamily: 'Roboto', color: 'rgba(0, 0, 0, 0.50)', fontSize: 14, marginLeft: 3.2 }}>
                                {post.status}
                            </Typography>
                        </Card>
                        <div style={{ marginTop: 10, marginLeft: 14 }}>
                            <Typography variant="subtitle1" style={{ marginBottom: -6 }}>
                                Current Activity: {post.activity}
                            </Typography>
                            <Typography variant="subtitle1" style={{ marginBottom: -6 }}>
                                Medication: {post.medication}
                            </Typography>
                            <Typography variant="subtitle1">
                                Condition: {post.condition}
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </Grid>
        </div>
    );
}
