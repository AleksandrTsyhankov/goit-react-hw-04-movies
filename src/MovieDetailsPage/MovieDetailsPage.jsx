import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useParams, NavLink, useRouteMatch, Switch, useHistory, useLocation, Route } from 'react-router-dom';
import { fetchGetMovieDetails } from '../api/ApiServices';
import s from './MovieDetailsPage.module.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Spinner from '../Spinner/Spinner';
import NotFoundView from '../NotFoundPage/NotFoundView';

const Cast = lazy(() => import('../Cast/Cast'));
const Reviews = lazy(() => import('../Reviews/Reviews'));

function MovieDetailsPage() {
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { movieId } = useParams();
    const { url, path } = useRouteMatch();
    const history = useHistory();
    const location = useLocation();

    const onGoBackClick = () => {
        return history.push(location?.state?.from ?? '/');
    }

    
    useEffect(() => {
        fetchGetMovieDetails(movieId).then((r) => {
            if (r.success === false) {
                setMovie(null);
                throw new Error('Something went wrong');
            } else {
                return r;
            }
        })
            .then(setMovie)
            .catch(error => setError(error))
    }, [movieId]);
    
    return (
    <>
            {error && <NotFoundView />}
            {!loading && movie &&
        <div className={s.movieDetailsContainer}>
            
            
            
                <div>
                <button type='button' onClick={onGoBackClick} className={s.goBackBtn}>&#8592; Go back</button>
                <div className={s.movieCardContainer}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        className={s.movieCardImg}
                        alt={movie.name ?? movie.title}
                    />
                        <ul className={s.movieAboutList}>
                            <li>
                            <h3>
                                {movie.name ?? movie.title} ({movie.release_date.slice(0, 4)})
                            </h3>
                                <p>{movie.vote_average} / 10</p>
                            </li>
                            <li>
                                <h3>Overview</h3>
                                <p>{movie.overview}</p>
                            </li>
                            <li>
                                <h3>Genres</h3>
                            <p>{
                                movie.genres
                                ? movie.genres.map((genre) => genre.name).join(', ')
                                : <span>no genres</span>
                            }
                            </p>
                            </li>
                    </ul>
                </div>

                <p className={s.addInfoTitle}>Additional information</p>
                <ul className={s.additionalIntoList}>
                    <p className={s.additionalInfoLink}>

                        <NavLink
                            to={{
                                pathname: `${url}/cast`,
                                state: {from: location.state ? location.state.from : '/'}
                            }}
                            className={s.additionalInfoLink}
                            activeClassName={s.additionalInfoLinkActive}
                        >
                            Cast
                        </NavLink>
                        
                    </p>

                    <p className={s.additionalInfoLink}>
                        <NavLink
                            to={{
                                pathname: `${url}/reviews`,
                                state: {from: location.state ? location.state.from : '/'}
                            }}
                            className={s.additionalInfoLink}
                            activeClassName={s.additionalInfoLinkActive}
                        >
                            Reviews
                        </NavLink>
                    </p>
                        <Suspense fallback={<Spinner />}>
                        <Switch>
                        <Route path={`${path}/cast`}>
                            <Cast movieId={movieId}/>
                        </Route>

                        <Route path={`${path}/reviews`}>
                            <Reviews movieId={movieId}/>
                        </Route>
                        </Switch>
                    </Suspense>
                </ul>
                </div>
        </div>}
        </> 
    );
}

export default MovieDetailsPage;