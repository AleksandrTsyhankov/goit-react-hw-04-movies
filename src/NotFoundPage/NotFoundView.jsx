import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import s from '../MovieDetailsPage/MovieDetailsPage.module.css';

const NotFoundView = () => {
  const history = useHistory();
  const location = useLocation();

  const onGoBackClick = () => {
      if(!location.state.from) {return}
        return history.push(location.state.from)
    }

  return (
    <>
      <button type='button' onClick={onGoBackClick} className={s.goBackBtn}>&#8592; Go back</button>
      <h1 className={s.err404}>{`404 - page not found :(`}</h1>
    </>
  );
};

export default NotFoundView;
