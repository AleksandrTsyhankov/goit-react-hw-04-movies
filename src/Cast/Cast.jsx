import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchGetMovieCredits } from '../api/ApiServices';
import s from './Cast.module.css';
import Spinner from '../Spinner/Spinner';

function Cast({ movieId }) {
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    console.log(location)
    
    useEffect(() => {
        setLoading(true);
        fetchGetMovieCredits(movieId).then(r => r.cast).then(setCast).finally(setLoading(false))
    }, [movieId])

    return (
    <>
            {loading && <Spinner />}
            {cast &&
            <ul>
            {cast.map(card => (
                <li key={card.id} className={s.castItem}>
                    <img
                        className={s.profileImg}
                        src={card.profile_path
                            ? `https://image.tmdb.org/t/p/w500/${card.profile_path}`
                            : null
                        }
                        alt={card.name}
                    />
                    <p><span className={s.circle}></span>{card.name}</p>
                    <p>Character: {card.character}</p>
                </li>
            ))}
        </ul>
            }
    </>
    );
};

export default Cast;