import React, { ChangeEvent, useState } from 'react';
import style from './ProfileInfo.module.scss';
import { ProfileStatus } from './ProfileStatus/ProfileStatus';
import ProfileDataForm from './ProfileFormData/ProfileDataForm';
import profileImage from '../../../../Images/flat-face-icon-23.png';
import { ProfileData } from './ProfileData/ProfileData';
import { ProfileInfoPropsType } from '../../types';
import { ProfileType } from '../../../../Redux/Reducers/profileReducer/types';

const ProfileInfo = ( { profile, status, updateStatus, isOwner, savePhoto, saveProfile }: ProfileInfoPropsType ) => {

  const [ editMode, setEditMode ] = useState<boolean>( false );

  const onMainPhotoSelected = ( e: ChangeEvent<HTMLInputElement> ) => {
    if ( e.target.files && e.target.files.length ) {
      savePhoto( e.target.files[ 0 ] );
    }
  };

  const onSubmit = async ( formData: ProfileType ): Promise<any> => {
    await saveProfile( formData );
    setEditMode( false );
  };

  return (
    <div className={ style.profileInfoBlock }>
      <div className={ style.imagesBlock }>
        <img className={ style.backgroundImg }
             src={ 'https://images.pexels.com/photos/989941/pexels-photo-989941.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }
             alt={ 'backgroundImg' }
        />
        <div className={ style.avatar }>
          <img
            src={ profile && profile.photos.large !== null ? profile.photos.large : profileImage }
            alt={ 'avatar' }/>
          { isOwner && <div className={ style.avatarEdit }>
              <input type={ 'file' } onChange={ onMainPhotoSelected } id="imageUpload"
                     accept=".png, .jpg, .jpeg"/>
              <label htmlFor="imageUpload"/>
          </div> }
        </div>
      </div>
      <div className={ style.profileInfo }>
        <ProfileStatus
          status={ status }
          isOwner={ isOwner }
          updateStatus={ updateStatus }
        />
        { profile?.lookingForAJob ? <span className={ style.lookingJob }>Looking for a job!</span> : '' }
        { editMode
          ? <ProfileDataForm
            initialValues={ profile }
            onSubmit={ onSubmit }
            profile={ profile }
          />
          : <ProfileData
            profile={ profile }
            isOwner={ isOwner }
            goToEditMode={ () => {
              setEditMode( true );
            } }
          />
        }
      </div>
    </div>
  );
};

export default ProfileInfo;