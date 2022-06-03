import React from 'react';
import preloader from '../../../../Images/preloader.svg';
import style from './Preloader.module.css';

export const Preloader = () => {
  return (
    <div className={ style.preloader }>
      <img src={ preloader } alt={ 'preloader' }/>
    </div>
  );
};