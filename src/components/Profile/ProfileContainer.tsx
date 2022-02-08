import React, {ComponentType} from 'react';
import Profile from "./Profile";
import {getProfile, getStatus, ProfilePropsType, setUserProfile, updateStatus} from "../../Redux/profile-reducer";
import {AppStateType} from "../../Redux/redux-store";
import {compose} from "redux";
import {connect} from "react-redux";
import {InjectedProps, withRouter2} from "../../HOC/withRouter";
import {WithAuthRedirect} from "../../HOC/WithAuthRedirect";


type MapStatePropsType = {
    profile: ProfilePropsType
    isAuth: boolean
    status: string
    authorizedUserId: string
}
type MapDispatchPropsType = {
    setUserProfile: (profile: MapStatePropsType) => void
    getProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
}

type OwnPropsType = MapStatePropsType & MapDispatchPropsType & InjectedProps


class ProfileAPIContainer extends React.Component<OwnPropsType> {

    componentDidMount() {
        let userId: string = this.props.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
        }
        this.props.getProfile(userId);
        this.props.getStatus(userId);
    }

    render() {
        return (
            <Profile
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
            />
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        isAuth: state.auth.isAuth,
        authorizedUserId: state.auth.data.id
    }
};

export default compose<ComponentType>
(connect(mapStateToProps, {
        setUserProfile,
        getProfile,
        getStatus,
        updateStatus
    }),
    withRouter2,
    WithAuthRedirect
)
(ProfileAPIContainer);

