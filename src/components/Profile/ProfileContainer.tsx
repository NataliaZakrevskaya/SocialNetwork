/*import React, {ComponentType} from 'react';*/
import Profile from "./Profile";
import {
    getProfile,
    getStatus, profileReducerActions,
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




/*class ProfileAPIContainer extends React.Component<> {*/

    /*updateProfile(){
        let userId: string = this.props.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
        }
        this.props.getProfile(userId);
        this.props.getStatus(userId);
    }*/

   /* componentDidMount() {
        this.updateProfile()
    }*/

    /*componentDidUpdate(prevProps: Readonly<OwnPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.userId !== prevProps.userId) {
            this.updateProfile()
        }
    }*/

/*    render() {
        return (
            <Profile/>
        )
    }
}*/

/*let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
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
(ProfileAPIContainer);*/

