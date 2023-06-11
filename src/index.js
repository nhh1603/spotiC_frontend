import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from "react-redux"; // Redux
import { legacy_createStore as createStore, applyMiddleware, compose } from "redux"; // Redux
import thunk from "redux-thunk"; // Redux
import reducers from "./reducers"; 

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
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
        
    </Provider>
  </React.StrictMode>
);
