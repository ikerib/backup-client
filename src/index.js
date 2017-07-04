import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Main from "./component/main/main";

ReactDOM.render(<Main />, document.getElementById('main'));

registerServiceWorker();
