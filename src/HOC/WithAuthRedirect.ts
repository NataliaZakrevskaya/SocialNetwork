import {useNavigate} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => {
    isAuth: state.auth.isAuth
}


export const WithAuthRedirect = (Component: any) => {

    const RedirectComponent = () => {
        let navigate = useNavigate();
        if (!props.isAuth) {
            navigate("/login")
        }
        return <Component {...props}
        />
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);
    return ConnectedAuthRedirectComponent;
};
