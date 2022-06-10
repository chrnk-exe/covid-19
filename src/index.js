import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createStore} from 'react-redux';
import { Provider } from 'react-redux/es/exports';
import {reactReducer}  from './redux/rootReducer'

const store = createStore();
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>);
