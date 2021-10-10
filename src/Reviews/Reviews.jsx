import React, { useState, useEffect } from 'react';
import { fetchGetMovieReviews } from '../api/ApiServices';
import Spinner from '../Spinner/Spinner';
import s from './Reviews.module.css';

function Reviews({ movieId }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        fetchGetMovieReviews(movieId).then(r => r.results).then(setReviews).finally(setLoading(false))
    }, [movieId])

    return (
        <>
            {loading && <Spinner />}
            {reviews.length === 0 && < div >{`no reviews yet :(`}</div>}
            {reviews &&
            <ul className={s.reviewsList}>
            {reviews && reviews.map(review => (
            <li key={review.id} className={s.reviewsItem}>
                <p className={s.authorName}>
                    <span className={s.circle}></span>
                    Author: {review.author}
                </p>
                <p>
                    {review.content}
                </p>
            </li>
            ))}
                </ul>
        }  
        </>
    );
};

export default Reviews;