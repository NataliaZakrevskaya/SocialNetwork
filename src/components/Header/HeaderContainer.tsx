import React, {useEffect} from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {getAuth} from "../../Redux/auth-reducer";

type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
}
type MapDispatchToPropsType = {
    getAuth: () => void
}
type HeaderPropsType = MapStateToPropsType & MapDispatchToPropsType

const HeaderContainer = (props: HeaderPropsType) => {
    debugger;
    useEffect(() => {
        props.getAuth();
    }, [])
    return <Header/>
}

const mapStateToProps = (state: MapStateToPropsType) => {
    isAuth: state.auth.isAuth,
        login
:
    state.auth.login
}
export default connect(mapStateToProps, {getAuth})(HeaderContainer);


/*class HeaderContainer extends React.Component{
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0//auth/me`,{
            withCredentials: true
        })
            .then(response => {
                if(response.data.resultCode === 0){
                    this.props.setAuthUserData(response.data.data.login)
                }

            })
    }

    render(){
        return <Header {...this.props}/>
    }
}*/