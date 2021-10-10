import React, { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../api/ApiServices';
import { Link, useLocation } from 'react-router-dom';
import s from './HomePage.module.css';

function NomePage() {
    const [movies, setMovies] = useState([]);
    const location = useLocation();

    useEffect(() => {
        fetchTrendingMovies().then(setMovies)
    }, [])

    return (
        <>
            <h1 className={s.trendingTitle}>Trending today</h1>
            <ul className={s.trendingList}>
                {
                    movies.map(movie => (
                        <li key={movie.id} className={s.trendingListItem}>
                            <Link
                                className={s.trendingLink}
                                to={{
                                    pathname: `/movies/${movie.id}`,
                                    state: {from: location}
                                }}
                            >
                                {movie.name ?? movie.title}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </>
    );
};

export default NomePage;