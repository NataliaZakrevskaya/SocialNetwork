import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Navbar from './Components/Navbar/Navbar';
//@ts-ignore
import style from './App.scss';
import { CHAT, DIALOGS, EMPTY_URL, LOGIN, PROFILE, UNDEFINED_URL, USER_ID, USERS } from './constants';
import { AppPropsType } from './types';

const DialogsPage = React.lazy( () => import('./Components/Pages/Dialogs/Dialogs') );
const ProfileContainer = React.lazy( () => import('./Components/Pages/Profile/ProfileContainer') );
const UsersPage = React.lazy( () => import('./Components/Pages/Users/UsersPage') );
const LoginPage = React.lazy( () => import('./Components/Pages/Login/LoginPage') );
const ChatPage = React.lazy( () => import('./Components/Pages/Chat/ChatPage') );

class App extends React.Component<AppPropsType> {
  catchAllUnhandledErrors = ( promiseRejectionEvent: any ) => {
    alert( promiseRejectionEvent );
  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener( 'unhandledrejection', this.catchAllUnhandledErrors );
  }

  componentWillUnmount() {
    window.removeEventListener( 'unhandledrejection', this.catchAllUnhandledErrors );
  }

  render() {
    return (
      <main className={ style.appWrapper }>
        <Header/>
        <Navbar/>
        <div className={ style.appWrapperContent }>
          <Routes>
            <Route path={ EMPTY_URL } element={ <Navigate to={ PROFILE }/> }/>

            <Route path={ DIALOGS } element={ <DialogsPage/> }>
              <Route path={ USER_ID } element={ <DialogsPage/> }/>
            </Route>
            <Route path={ PROFILE } element={ <ProfileContainer/> }>
              <Route path={ USER_ID } element={ <ProfileContainer/> }/>
            </Route>
            <Route path={ USERS } element={ <UsersPage/> }/>
            <Route path={ LOGIN } element={ <LoginPage/> }/>
            <Route path={ CHAT } element={ <ChatPage/> }/>
            <Route path={ UNDEFINED_URL } element={ <div>404 NOT FOUND</div> }/>
          </Routes>
        </div>
      </main>
    );
  }
}

export default App;
