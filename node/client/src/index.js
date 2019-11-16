import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import initReactFastclick from 'react-fastclick';
import history from "./utils/history"
import {LStorage} from "./static/js/common"
initReactFastclick();

window.h=history;
window.LStorage=LStorage;

ReactDOM.render(
   <App history={history}/>
, document.getElementById('root'));
registerServiceWorker();
