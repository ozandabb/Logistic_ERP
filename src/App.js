import React, { Component } from 'react';
import './App.css';
import RootRouter from "./RootRouter";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store} from './Redux/Store/Store';
import './custom.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import jwt_decode from "jwt-decode"
import setAuthToken from "./Redux/utils/setAuthToken"
import { setCurrentUser, logoutUser } from "./Redux/Action/authAction"

//check for token
if(localStorage.jwtToken){
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  //set User and isathuenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now / 1000;
  if(decoded.exp < currentTime ){
    //logout user
    store.dispatch(logoutUser());

    //redirect to login
    window.location.href = '/';
  }
}

function App() {
  return(

    <Provider store={store}>
     
        <RootRouter />
   
    </Provider>

  );
}


export default App;
