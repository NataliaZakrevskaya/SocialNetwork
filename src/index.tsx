import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from "./Redux/redux-store";
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "./StoreContext";
import {StatePropsType} from "./Redux/store";

let rerenderEntireTree = (state: StatePropsType) => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                <App />
                </Provider>
            </BrowserRouter>
        </React.StrictMode>, document.getElementById('root')
    )
}

rerenderEntireTree(store.getState());
store.subscribe(() => {
    let state = store.getState();
    rerenderEntireTree(state)
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
