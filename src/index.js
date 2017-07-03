import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import App from './component/app/App';
import registerServiceWorker from './registerServiceWorker';
import Server from "./component/servers/server";
import Sidebar from "./component/sidebar/sidebar";

ReactDOM.render(<Server />, document.getElementById('divNavBar'));
ReactDOM.render(<Sidebar />, document.getElementById('sidebar'));
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
