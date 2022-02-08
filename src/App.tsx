import React from 'react'
import './App.css'
import Navbar from "./components/Navbar/Navbar";
import {Route, Routes} from 'react-router-dom';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";

const App = () => {

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
                    <Route path='/login' element={<Login/>}/>

                </Routes>
            </div>
        </main>
    );

}

export default App;

