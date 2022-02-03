import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {getAuth} from "../../Redux/auth-reducer";
import {AppStateType} from "../../Redux/redux-store";

type MapStateToPropsType = {
    isAuth: boolean
    login: string
}
type MapDispatchToPropsType = {
    getAuth: () => void
}
type HeaderPropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderPropsType, HeaderPropsType> {

    componentDidMount() {
        this.props.getAuth()
    }

    render() {
        return <Header
            isAuth={this.props.isAuth}
            login={this.props.login}
        />
    }
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})


export default connect(mapStateToProps, {getAuth})(HeaderContainer);

