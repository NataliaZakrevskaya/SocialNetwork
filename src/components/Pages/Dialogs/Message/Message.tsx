import React from 'react';
import style from '../Dialogs.module.scss';
import { MessageType } from '../../types';

const Message = ( props: MessageType ) => {

  return (
    <div>
      <span
        className={ props.isAuth ? `${ style.message } ${ style.isAuthMessages }` : style.message }>{ props.message }</span>
    </div>
  );
};

export default Message;
