import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Redux
import { Provider } from "react-redux";
// import { legacy_createStore as createStore, applyMiddleware, compose } from "redux"; // Redux
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "./redux/store";

// const store = createStore(reducers, compose(applyMiddleware(thunk)));
let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate persistor={persistor}>
                
            <BrowserRouter>
                <App />
                <ToastContainer
                    position="bottom-center"
                    autoClose={2000}
                    hideProgressBar={true}
                    closeButton={false}
                    theme="colored"
                    icon={false}
                />
            </BrowserRouter>
        </PersistGate>
    </Provider>
  </React.StrictMode>
);
