import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, setUserProfile} from "../../Redux/profile-reducer";
import {useParams} from "react-router-dom";

type ProfilePropsType = {
    userId: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string
        large: string
    }
}
type MapStatePropsType = {
    profile: ProfilePropsType
    isAuth: boolean
    //match: any
}
type MapDispatchPropsType = {
    setUserProfile: (profile: MapStatePropsType) => void
    getProfile: (userId: number) => void
}

type OwnPropsType = MapStatePropsType & MapDispatchPropsType

const withRouter = WrappedComponent => props => {
    const params = useParams();
    return (
        <WrappedComponent
            {...props}
            params={params}
        />
    );
};

function ProfileContainer(props: OwnPropsType) {
    useEffect(() => {
        let userId = props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
        props.getProfile(userId)
    }, [])

    if (!props.isAuth) return <Redirect to={'/login'}/>
    return (
        <Profile profile={props.profile}/>
    )
}


let mapStateToProps = (state: any): MapStatePropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer);
export default connect(mapStateToProps, {setUserProfile, getProfile})(WithUrlDataContainerComponent);


// классовая компонента
/*class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.params.userId;
        if (!userId) {
            userId = 2;
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                this.props.setUserProfile(response.data);
            })
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile}/>
    }
}*/