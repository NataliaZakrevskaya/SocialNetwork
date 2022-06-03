import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import userPhoto from '../../../../Images/flat-face-icon-23.png';
import style from './User.module.scss';
import { PROFILE } from '../../../../constants';
import { UsersPropsType } from '../../types';

export const User = memo( ( { user, followingInProgress, unfollow, follow }: UsersPropsType ) => {

    return (
      <div className={ style.user }>
        <div className={ style.userInfo }>
          <NavLink to={ PROFILE + user.id }>
            <img
              src={ user.photos.small !== null ? user.photos.small : userPhoto }
              alt={ 'userPhoto' }
            />
          </NavLink>
          <span className={ style.userName }>{ user.name }</span>
          <span className={ style.userStatus }>{ user.status }</span>
        </div>
        <>
          {
            user.followed
              ? ( <button
                className={ style.unFollowBtn }
                disabled={ followingInProgress.some( id => id === user.id ) }
                onClick={ () => {
                  unfollow( user.id );
                } }>
                unfollow
              </button> )

              : ( <button
                className={ style.followBtn }
                disabled={ followingInProgress.some( id => id === user.id ) }
                onClick={ () => {
                  follow( user.id );
                } }>
                follow
              </button> )
          }
        </>
      </div>
    );
  },
);
