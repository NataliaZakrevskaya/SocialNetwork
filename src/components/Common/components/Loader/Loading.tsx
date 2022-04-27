import React from 'react';
import style from "./Loading.module.css"

const Loading = () => {

  return (
    <div className={style.preloader}>
      <div className={style.preloader__row}>
        <div className={style.preloader__item}/>
        <div className={style.preloader__item}/>
      </div>
    </div>
  );
};

export default Loading;