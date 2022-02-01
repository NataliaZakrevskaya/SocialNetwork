import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, setUserProfile} from "../../Redux/profile-reducer";
import {useParams} from "react-router-dom";
import {compose} from "redux";

type mapStateToPropsForRedirect = {
    isAuth: boolean
}
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

    /* let navigate = useNavigate();

     if (!props.isAuth) {
         navigate("/login")
     }*/

    return (
        <Profile profile={props.profile}/>
    )
}


/*let mapStateToPropsForRedirect = (state: any): mapStateToPropsForRedirect => ({
    isAuth: state.auth.isAuth
});

AuthRedirectComponent = connect(mapStateToPropsForRedirect)(AuthRedirectComponent);*/
/*let AuthRedirectComponent = WithAuthRedirect(Profile);*/
//let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

let mapStateToProps = (state: any): MapStatePropsType => ({
    profile: state.profilePage.profile
});
export default compose(
    connect(mapStateToProps, {setUserProfile, getProfile}),
    withRouter,
    // WithAuthRedirect
)(Profile);


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