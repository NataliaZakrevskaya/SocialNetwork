import React, { ChangeEvent, useEffect, useState } from 'react';
import style from '../ProfileInfo.module.scss';
import { ProfileStatusType } from '../../../types';

export const ProfileStatus = ( props: ProfileStatusType ) => {

  const [ editMode, setEditMode ] = useState<boolean>( false );
  const [ status, setStatus ] = useState<string>( props.status );

  useEffect( () => {
    setStatus( props.status );
  }, [ props.status ] );

  const onSpanClick = () => {
    props.isOwner && setEditMode( true );
  };
  const onInputBlur = () => {
    setEditMode( false );
    props.updateStatus( status );
  };
  const onInputChange = ( e: ChangeEvent<HTMLInputElement> ) => {
    setStatus( e.currentTarget.value );
  };

  return (
    <div className={ style.statusBlock }>
      { !editMode &&
          <div className={ style.status }><b>Status: </b>
              <span className={ props.isOwner ? style.ownerStatus : '' }
                    onClick={ onSpanClick }
              >{ props.status || 'No status' }</span>
          </div>
      }
      { editMode &&
          <div>
              <input
                  onChange={ onInputChange }
                  onBlur={ onInputBlur }
                  autoFocus={ true }
                  value={ status }/>
          </div>
      }
    </div>
  );
};
