import React from 'react';
import style from '../Dialogs.module.scss';
import { DialogsType } from '../../types';

const DialogItem = ( props: DialogsType ) => {

  const onDialogItemClick = () => {
    props.showMessages( props.id );
  };

  return (
    <div className={ props.id !== props.activeUserID ? style.dialog : `${ style.dialog } ${ style.activeDialog }` }
         onClick={ onDialogItemClick }>
      <img className={ style.dialogImg }
           src={ props.avatar }
           alt={ 'dialogProfilePhoto' }/>
      <span>{ props.name }</span>
    </div>
  );
};

export default DialogItem;
