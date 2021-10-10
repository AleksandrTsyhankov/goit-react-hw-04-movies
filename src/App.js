import React, { lazy, Suspense} from 'react';
import './App.css';
import { Route, NavLink, Switch } from 'react-router-dom';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Spinner from './Spinner/Spinner';
const HomePage = lazy(() => import('./HomePage/HomePage'));
const MoviesPage = lazy(() => import('./MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./MovieDetailsPage/MovieDetailsPage'));
const NotFoundView = lazy(() => import('./NotFoundPage/NotFoundView'));


function App() {
  return (
    <nav>
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink
            exact
            to="/"
            className="NavLink"
            activeClassName="NavLink--active"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies"
            className="NavLink"
            activeClassName="NavLink--active"
          >
            Movies
          </NavLink>
        </li>
      </ul>
      
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/movies" component={MoviesPage} />
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
          <Route component={NotFoundView} />
        </Switch>
      </Suspense>
    </nav>
  );
}

export default App;
