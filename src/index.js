import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './component/context';
import store from './component/redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='626503275864-4lj55f4a1av2j9km9stg9589rmiag9rn.apps.googleusercontent.com'>
    {/* <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}> */}
      <Provider store={store} >
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
