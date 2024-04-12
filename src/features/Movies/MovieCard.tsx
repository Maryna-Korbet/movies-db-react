import { memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Tooltip, Typography } from '@mui/material';
import FavoriteIcon  from '@mui/icons-material/Favorite';

interface Props {
    id: number;
    title: string;
    overview: string;
    popularity: number;
    image?: string; 
    enableUserActions?: boolean;
}

function MovieCard({
    id,
    title,
    overview,
    popularity,
    image = "/thumbnail.jpg",
    enableUserActions,
}: Props) {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia component="div" image={image} sx={{pt: '56.25%'}} title='Movie thumbnail'/>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant='h5' gutterBottom>
                    {title}
                </Typography>                
                <Typography variant='body2' color='secondary'>
                    {overview}
                </Typography>
                <Typography variant='button' display={'block'} mt={2}>
                    {popularity}
                </Typography>
            </CardContent>
            <CardActions>
                <Button component={RouterLink} to={`/movies/${id}`} color='secondary'>
                    Details
                </Button>
                {enableUserActions &&
                    <Tooltip title="Add to favorites">
                        <IconButton>
                            <FavoriteIcon />
                        </IconButton>
                    </Tooltip>}
            </CardActions>
        </Card>
    );
}

export default memo(MovieCard);