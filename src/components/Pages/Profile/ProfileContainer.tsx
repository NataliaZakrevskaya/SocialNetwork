import React, { ComponentType } from 'react';
import Profile from './Profile';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from '../../Common/Components/HOC/withRouter/withRouter';
import { WithAuthRedirect } from '../../Common/Components/HOC/withAuthRedirect/WithAuthRedirect';
import { Preloader } from '../../Common/Components/Preloader/Preloader';
import { ProfileAPIContainerMapStateToPropsType, ProfileAPIContainerOwnPropsType } from '../types';
import { AppStateType } from '../../../Redux/types';
import {
  getProfile,
  getStatus,
  savePhoto,
  saveProfile,
  updateStatus,
} from '../../../Redux/Thunk/profileThunk/profileThunk';

class ProfileAPIContainer extends React.Component<ProfileAPIContainerOwnPropsType> {

  updateProfile() {
    let userId: string = this.props.userId;
    if ( !userId ) {
      userId = this.props.authorizedUserId;
    }
    this.props.getProfile( userId );
    this.props.getStatus( userId );
  }

  componentDidMount() {
    this.updateProfile();
  }

  componentDidUpdate( prevProps: Readonly<ProfileAPIContainerOwnPropsType>, prevState: Readonly<{}>, snapshot?: any ) {
    if ( this.props.userId !== prevProps.userId ) {
      this.updateProfile();
    }
  }

  render() {
    if ( !this.props.profile ) {
      return <Preloader/>;
    }
    return (
      <Profile
        isOwner={ !this.props.userId }
        profile={ this.props.profile }
        status={ this.props.status }
        updateStatus={ this.props.updateStatus }
        savePhoto={ this.props.savePhoto }
        saveProfile={ this.props.saveProfile }
      />
    );
  }
}

let mapStateToProps = ( state: AppStateType ): ProfileAPIContainerMapStateToPropsType => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth,
    authorizedUserId: state.auth.data.id,
  };
};

export default compose<ComponentType>
( connect
  ( mapStateToProps, {
    getProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile,
  } ),
  withRouter,
  WithAuthRedirect,
)
( ProfileAPIContainer );

