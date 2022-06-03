import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import style from './Profile.module.scss';
import MyPosts from './MyPosts.ts/MyPosts';
import { ProfileComponentPropsType } from '../types';

const Profile = ( props: ProfileComponentPropsType ) => {

  return (
    <div className={ style.profilePage }>
      <ProfileInfo
        isOwner={ props.isOwner }
        profile={ props.profile }
        status={ props.status }
        updateStatus={ props.updateStatus }
        savePhoto={ props.savePhoto }
        saveProfile={ props.saveProfile }
      />
      { props.isOwner && <MyPosts/> }
    </div>
  );
};

export default Profile;