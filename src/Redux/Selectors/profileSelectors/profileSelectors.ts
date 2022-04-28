import { AppStateType } from '../../types';
import { ProfileInitialStateType, ProfileType } from '../../Reducers/profileReducer/types';

export const getProfile = ( state: AppStateType ): ProfileType => {
  return state.profilePage.profile;
};
export const getProfilePage = ( state: AppStateType ): ProfileInitialStateType => {
  return state.profilePage;
};