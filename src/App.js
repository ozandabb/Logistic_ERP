import React, { Component } from 'react';
import './App.css';
import RootRouter from "./RootRouter";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './Redux/Store/Store';
import './custom.scss'


class App extends Component{
  
  render(){
    return(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RootRouter/>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
