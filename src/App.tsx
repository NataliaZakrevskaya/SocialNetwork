import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
//@ts-ignore
import style from "./App.scss"
import {AppMapDispatchToPropsType, AppMapStateToPropsType} from "./MainApp";

const DialogsPage = React.lazy(() => import('./Components/Pages/Dialogs/Dialogs'));
const ProfileContainer = React.lazy(() => import('./Components/Pages/Profile/ProfileContainer'));
const UsersPage = React.lazy(() => import('./Components/Pages/Users/UsersPage'));
const LoginPage = React.lazy(() => import('./Components/Pages/Login/LoginPage'));
const ChatPage = React.lazy(() => import('./Components/Pages/Chat/ChatPage'));

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
        return (
            <main className={style.appWrapper}>
                <Header/>
                <Navbar/>
                <div className={style.appWrapperContent}>
                    <Routes>
                        <Route path='/' element={<Navigate to={'/profile'}/>}/>

                        <Route path='/dialogs' element={<DialogsPage/>}>
                            <Route path=":userId" element={<DialogsPage/>}/>
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
        )
    }
}


export default App;

type AppPropsType = AppMapStateToPropsType & AppMapDispatchToPropsType