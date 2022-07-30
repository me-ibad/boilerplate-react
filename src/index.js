import React from 'react';

import ReactDOM from 'react-dom/client';

import 'assets/css/index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'assets/css/App.css';
import 'assets/fonts/Poppins-Regular.ttf';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import reportWebVitals from './reportWebVitals';
import { composeWithDevTools } from 'redux-devtools-extension';
import Root from 'routes';
import { master } from 'redux/store/reducers/combineReducer';
import { ToastContainer } from 'react-toastify';
import LanguageContextProvider from 'common/contexts/LanguageContext';

const queryClient = new QueryClient();
const store = createStore(master, composeWithDevTools(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <LanguageContextProvider>
          <Root />
        </LanguageContextProvider>

        <ToastContainer limit={1} />
      </React.StrictMode>
    </QueryClientProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
