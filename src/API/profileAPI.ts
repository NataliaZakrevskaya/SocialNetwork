import { instance } from './apiConfig';
import { PHOTO, PROFILE, STATUS } from './constants';
import { GetProfileResponseType, ProfileAPIResponseType, SavePhotoResponseType } from './types';
import { ProfileType } from '../Redux/Reducers/profileReducer/types';

export const profileAPI = {
  getProfile( userId: string ) {
    return instance.get<GetProfileResponseType>( PROFILE + userId );
  },
  getStatus( userId: string ) {
    return instance.get<string>( STATUS + userId );
  },
  updateStatus( status: string ) {
    return instance.put<ProfileAPIResponseType<{}>>( STATUS, { status } );
  },
  savePhoto( newPhoto: File ) {
    const formData = new FormData();
    formData.append( 'image', newPhoto );
    return instance.put<ProfileAPIResponseType<SavePhotoResponseType>>( PHOTO, formData, {
      headers: { 'Content-Type': 'multipart/form-Data' },
    } );
  },
  saveProfile( ProfileData: ProfileType ) {
    return instance.put<ProfileAPIResponseType<{}>>( PROFILE, ProfileData );
  },
};
