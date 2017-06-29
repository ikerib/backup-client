import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import App from './component/app/App';
import registerServiceWorker from './registerServiceWorker';
import Server from "./component/servers/server";

ReactDOM.render(<Server />, document.getElementById('sidebar'));
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
