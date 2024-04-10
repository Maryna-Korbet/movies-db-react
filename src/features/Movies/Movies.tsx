import { Movie, fetchMovies } from '../../reducers/movies';
import { RootState } from '../../store';
import MovieCard from './MovieCard';
import { useAppDispatch } from '../../hooks';

import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, LinearProgress, Typography } from '@mui/material';


interface MoviesProps {
    movies: Movie[];
    loading: boolean;
}

function Movies({ movies, loading }: MoviesProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    return (
        <Container sx={{ py: 8, maxWidth: 'lg', mt: 12}}>
            <Typography variant="h4" align='center' marginBottom={4} gutterBottom>
                Now playing
            </Typography>
            
            {loading
                ? (<LinearProgress color="primary"/>) 
            : (
                <Grid container spacing={4}>
                {
                    movies.map((movie) => (
                        <Grid item key={movie.id} xs={12} sm={6} md={4}>
                            <MovieCard
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                overview={movie.overview}
                                popularity={movie.popularity}
                                image={movie.image}
                            />
                        </Grid>
                    ))}
                </Grid>
                )
            }
        </Container>
    );
};

const mapStateToProps = (state: RootState) => ({
    movies: state.movies.top,
    loading: state.movies.loading,
})

const connector = connect(mapStateToProps);

export default connector(Movies);


