import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import userDefaultPhoto from '../../../../../Images/flat-face-icon-23.png';
import style from '../../ChatPage.module.scss';
import { PROFILE } from '../../../../../constants';
import { ChatMessageType } from '../../../../../Redux/Reducers/chatReducer/types';

export const ChatMessage: React.FC<{ message: ChatMessageType }> = memo( ( { message } ) => {
  return (
    <div className={ style.message }>
      <div className={ style.userInfoContainer }>
        <NavLink to={ PROFILE + message.userId }>
          <img
            src={ message.photo !== null ? message.photo : userDefaultPhoto }
            alt={ 'userImage' }
          />
        </NavLink>
        <span>{ message.userName }</span>
      </div>
      <span className={ style.messageText }>{ message.message }</span>
    </div>
  );
} );