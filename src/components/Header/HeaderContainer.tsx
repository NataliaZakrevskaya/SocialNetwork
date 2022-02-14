import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../Redux/auth-reducer";
import {AppStateType} from "../../Redux/redux-store";

type MapStateToPropsType = {
    isAuth: boolean
    login: string
}
type MapDispatchToPropsType = {
    logout: () => void
}
type HeaderPropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderPropsType, HeaderPropsType> {


    render() {
        return <Header
            isAuth={this.props.isAuth}
            login={this.props.login}
            logout={this.props.logout}
        />
    }
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.data.login,
})


export default connect(mapStateToProps, {logout})(HeaderContainer);

