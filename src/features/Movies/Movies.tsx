import { useEffect,  useContext } from 'react';
import { Container, Grid, LinearProgress, Typography } from '@mui/material';

import MovieCard from './MovieCard';
import { fetchNextPage } from '../../reducers/movies';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthContext, anonymousUser } from '../../contexts/AuthContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

function Movies() {
    const dispatch = useAppDispatch();
    const movies = useAppSelector((state) => state.movies.top);
    const loading = useAppSelector((state) => state.movies.loading);
    const hasMorePages = useAppSelector((state) => state.movies.hasMorePages);

    const { user } = useContext(AuthContext);
    const loggedIn = user !== anonymousUser;
    const [targetRef, entry] = useIntersectionObserver();

    useEffect(() => {
        if (entry?.isIntersecting && hasMorePages) {
            dispatch(fetchNextPage());
        }
        
    }, [dispatch, entry?.isIntersecting, hasMorePages]);

    return (
        <Container sx={{ py: 8, maxWidth: 'lg', mt: 12}}>
            <Typography variant="h4" align='center' marginBottom={4} gutterBottom>
                Now playing
            </Typography>
            <Grid container spacing={4}>
                {movies.map((movie) => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4}>
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            overview={movie.overview}
                            popularity={movie.popularity}
                            image={movie.image}
                            enableUserActions={loggedIn}
                        />
                    </Grid>
                    ))}
            </Grid>
            <div ref={targetRef}>
                { loading && <LinearProgress
                    color='primary'
                    sx={{ mt: 3}}
                />}
            </div>
        </Container>
    );
};

export default Movies;


