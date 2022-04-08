import React, {ComponentType} from 'react';
import Profile from "./Profile";
import {
    getProfile,
    getStatus,
    ProfileType,
    savePhoto,
    saveProfile,
    updateStatus
} from "../../Redux/profile-reducer";
import {AppStateType} from "../../Redux/redux-store";
import {compose} from "redux";
import {connect} from "react-redux";
import {InjectedProps, withRouter2} from "../../HOC/withRouter";
import {WithAuthRedirect} from "../../HOC/WithAuthRedirect";


type MapStateToPropsType = {
    profile: ProfileType
    isAuth: boolean
    status: string
    authorizedUserId: string
}
type MapDispatchToPropsType = {
    setUserProfile: (profile: MapStateToPropsType) => void
    getProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
    savePhoto: (newPhoto: File) => void
    saveProfile: (profileData: ProfileType) => Promise<any>
}

type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType & InjectedProps


class ProfileAPIContainer extends React.Component<OwnPropsType> {

    updateProfile(){
        let userId: string = this.props.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
        }
        this.props.getProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.updateProfile()
    }

    componentDidUpdate(prevProps: Readonly<OwnPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.userId !== prevProps.userId) {
            this.updateProfile()
        }
    }

    render() {
        return (
            <Profile
                isOwner={!this.props.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                savePhoto={this.props.savePhoto}
                saveProfile={this.props.saveProfile}
            />
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        isAuth: state.auth.isAuth,
        authorizedUserId: state.auth.data.id
    }
};

export default compose<ComponentType>
(connect
    (mapStateToProps, {
        getProfile,
        getStatus,
        updateStatus,
        savePhoto,
        saveProfile,
    }),
    withRouter2,
    WithAuthRedirect
)
(ProfileAPIContainer);

