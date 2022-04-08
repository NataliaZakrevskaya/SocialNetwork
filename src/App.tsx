import React from 'react'
import './App.css'
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./Redux/app-reducer";
import store, {AppStateType} from "./Redux/redux-store";
import {Preloader} from "./components/Common/Preloader/Preloader";
import ProfileContainer from "./components/Profile/ProfileContainer";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersPage = React.lazy(() => import('./components/Users/UsersPage'));
const LoginPage = React.lazy(() => import('./components/Login/LoginPage'));
const ChatPage = React.lazy(() => import('./Pages/Chat/ChatPage'));

type MapStateToPropsType = {
    initialized: boolean
}
type MapDispatchToPropsType = {
    initializeApp: () => void
}
type AppPropsType = MapStateToPropsType & MapDispatchToPropsType


class App extends React.Component<AppPropsType> {
    catchAllUnhandledErrors = (promiseRejectionEvent: any) => {
        alert(promiseRejectionEvent)
    }
    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }
    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
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
                        <Route path='/' element={<Navigate to={'/profile'}/>}/>

                        <Route path='/dialogs' element={<DialogsContainer/>}>
                            <Route path=":userId" element={<DialogsContainer/>}/>
                        </Route>
                        <Route path='/profile' element={<ProfileContainer/>}>
                            <Route path=":userId" element={<ProfileContainer/>}/>
                        </Route>
                        <Route path='/users' element={<UsersPage/>}/>
                        <Route path='/login' element={<LoginPage/>}/>
                        <Route path='/chat' element={<ChatPage/>}/>
                        <Route path='*' element={<div>404 NOT FOUND</div>}/>

                    </Routes>
                </div>
            </main>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    initialized: state.app.initialized
});

const AppContainer = connect(mapStateToProps, {initializeApp})(App);

export const MainApp = () => {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Provider store={store}>
                    <AppContainer/>
                </Provider>
            </BrowserRouter>
        </React.Suspense>
    )
}