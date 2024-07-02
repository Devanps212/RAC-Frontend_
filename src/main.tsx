import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './features/axios/redux/app/store';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import "react-country-state-city/dist/react-country-state-city.css";
import 'react-datepicker/dist/react-datepicker.css';
// import SocketContextProvider from './context/socketContext';


ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <SocketContextProvider> */}
        <App />
      {/* </SocketContextProvider> */}
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      draggable
      pauseOnHover
    />
    </Provider>
  </React.StrictMode>,
);
