const KEY = 'f1993709e3fb1cea045a2e1155962b26';

export function fetchTrendingMovies() {
    return fetch(`https://api.themoviedb.org/3//trending/all/day?api_key=${KEY}`)
        .then(r => r.json()).then(res => res.results);
};

export function fetchSearchMovieByKeyword(keyword) {
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${keyword}&language=en-US&page=1&include_adult=false`)
        .then(r => r.json());
};

export function fetchGetMovieDetails(movieId) {
    return fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${KEY}&language=en-US`)
        .then(r => r.json());
};

export function fetchGetMovieCredits(movieId) {
    return fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${KEY}&language=en-US`)
        .then(r => r.json());
}

export function fetchGetMovieReviews(movieId) {
    return fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${KEY}&language=en-US&page=1`)
        .then(r => r.json());
};



fetchTrendingMovies(/*13640*/).then(console.log)
// fetchSearchMovieByKeyword('batman')
// fetchGetMovieDetails(13640).then(console.log)

// fetchGetMovieCredits(13640).then(console.log)



/*
https://developers.themoviedb.org/3/trending/get-trending - список самых популярных фильмов на сегодня для создания коллекции на главной странице.
https://developers.themoviedb.org/3/search/search-movies - поиск кинофильма по ключевому слову на странице фильмов.
https://developers.themoviedb.org/3/movies/get-movie-details - запрос полной информации о фильме для страницы кинофильма.
https://developers.themoviedb.org/3/movies/get-movie-credits - запрос информации о актёрском составе для страницы кинофильма.
https://developers.themoviedb.org/3/movies/get-movie-reviews - запрос обзоров для страницы кинофильма.
*/

