import React, { memo } from 'react';
import style from '../../ProfileInfo.module.scss';
import { ContactPropsType } from '../../../../types';

export const Contact = memo( ( { contactTitle, contactValue }: ContactPropsType ) => {
    return (
      <div className={ style.contact }>
        <b>{ contactTitle }: </b>
        <a href={ contactValue } rel={ 'noreferrer' } target="_blank">{ contactValue }</a>
      </div>
    );
  },
);