import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './containers/main';
import { BrowserRouter as Router } from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <Router>
    <Main />
  </Router>
), document.getElementById('root'));
registerServiceWorker();
