import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../Redux/redux-store";
import {Navigate} from "react-router-dom";

type MapStateToPropsType = {
    isAuth: boolean
}

const mapStateToPropsForRedirect = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}


export function WithAuthRedirect<T>(WrappedComponent: React.ComponentType<T>) {

    const RedirectComponent = (props: MapStateToPropsType) => {

        const {isAuth, ...restProps} = props;

        if (!isAuth) {
            return <Navigate to='/login'/>
        }

        return <WrappedComponent {...restProps as T}/>
    }


    return connect(mapStateToPropsForRedirect)(RedirectComponent);
};
