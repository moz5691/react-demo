import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import App1 from './App1';
import AppRouter from './AppRouter';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(< AppRouter />, document.getElementById('root'));

serviceWorker.unregister();