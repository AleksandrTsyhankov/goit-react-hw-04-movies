import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { fetchSearchMovieByKeyword } from '../api/ApiServices';
import s from './MoviesPage.module.css';


function MoviesPage() {
    // const [query, setQuery] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [movies, setMovies] = useState(null);
    const [error, setError] = useState(null);
    const location = useLocation();
    const hist = useHistory();
    const query = new URLSearchParams(location.search).get('query');


    const handleInputChange = (e) => {
        const { value } = e.target;
        return setSearchValue(value);
    }

    const resetSearchValue = () => {
        setSearchValue('');
    }

    const click = (e) => {
        e.preventDefault();
        resetSearchValue();

        hist.push({
            ...location,
            search: `query=${searchValue}`
        })
    }

    useEffect(() => {
        if (!query) { return };

        fetchSearchMovieByKeyword(query)
            .then(r => r.results)
            .then((r) => {
                if (r.success === false) {
                    setMovies(null);
                    throw new Error('Something went wrong');
                } else {
                    return r;
                }
            })
            .then(setMovies)
            .catch(error => setError(error));
    }, [query])


    console.log(movies)
    

    return (
        <>
        {error && <div>something went wrong...</div>}
            {!error &&
                <>
        <form
            className={s.searchContainer}
            onSubmit={click}
        >
            <input
                type="text"
                className={s.searchInput}
                onChange={handleInputChange}
                value={searchValue}
            />
            <button type="submit" className={s.searchBtn}>Search</button>
            </form>
            <ul className={s.List}>
                { movies && 
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
        }
        </>
    );
};

export default MoviesPage;