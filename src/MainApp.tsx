import {connect, Provider} from "react-redux";
import store from "./Redux/reduxStore";
import React from "react";
import Loading from "./Components/Common/Components/Loader/Loading";
import {HashRouter} from "react-router-dom";
import App from "./App";
import {AppStateType} from "./Redux/types";
import {initializeApp} from "./Redux/Thunk/appThunk/appThunk";

export const MainApp = () => {
  return (
    <React.Suspense fallback={<Loading/>}>
      <HashRouter>
        <Provider store={store}>
          <AppContainer/>
        </Provider>
      </HashRouter>
    </React.Suspense>
  )
}

const mapStateToProps = (state: AppStateType): AppMapStateToPropsType => ({
  initialized: state.app.initialized
});


const AppContainer = connect<AppMapStateToPropsType, AppMapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {initializeApp})(App);

// TYPES
export type AppMapStateToPropsType = {
  initialized: boolean
}
export type AppMapDispatchToPropsType = {
  initializeApp: () => void
}