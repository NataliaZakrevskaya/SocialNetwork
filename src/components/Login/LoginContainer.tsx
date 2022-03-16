import React from 'react';
import {connect} from "react-redux";
import {Login} from "./Login";
import {AppStateType} from "../../Redux/redux-store";
import {login} from "../../Redux/auth-reducer";

type mapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
type mapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type LoginContainerType = mapStateToPropsType & mapDispatchToPropsType

class LoginAPIContainer extends React.Component<LoginContainerType, LoginContainerType> {

    render() {
        return (
            <Login
                isAuth={this.props.isAuth}
                login={this.props.login}
                captchaUrl={this.props.captchaUrl}
            />
        )
    }
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export const LoginContainer = connect(mapStateToProps, {
    login
})(LoginAPIContainer)