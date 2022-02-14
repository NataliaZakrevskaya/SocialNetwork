import React, {ComponentType} from 'react'
import './App.css'
import Navbar from "./components/Navbar/Navbar";
import {Route, Routes} from 'react-router-dom';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {LoginContainer} from "./components/Login/LoginContainer";
import {connect} from "react-redux";
import {withRouter} from "./HOC/withRouter";
import {compose} from "redux";
import {initializeApp} from "./Redux/app-reducer";
import {AppStateType} from "./Redux/redux-store";
import {Preloader} from "./components/Common/Preloader/Preloader";

type MapStateToPropsType = {
    initialized: boolean
}
type MapDispatchToPropsType = {
    initializeApp: () => void
}
type AppPropsType = MapStateToPropsType & MapDispatchToPropsType


class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <main className={"app-wrapper"}>
                <HeaderContainer/>
                <Navbar/>
                <div className={"app-wrapper-content"}>
                    <Routes>
                        <Route path='/dialogs' element={<DialogsContainer/>}>
                            <Route path=":userId" element={<DialogsContainer/>}/>
                        </Route>
                        <Route path='/profile' element={<ProfileContainer/>}>

                            <Route path=":userId" element={<ProfileContainer/>}/>
                        </Route>
                        <Route path='/users' element={<UsersContainer/>}/>
                        <Route path='/login' element={<LoginContainer/>}/>

                    </Routes>
                </div>
            </main>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    initialized: state.app.initialized
});

export default compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))
(App);

