import React from 'react';
import './App.css';
import RootRouter from "./RootRouter";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './Redux/Store/Store';
import './custom.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../src/assersts/commoncss/alerts.css";

toast.configure(); 

function App() {
  return(
    <Provider store={store}>
      <PersistGate persistor={persistor} >
        <RootRouter />
      </PersistGate>
    </Provider>
  );
}


export default App;
