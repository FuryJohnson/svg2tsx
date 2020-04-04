import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import registerServiceWorker from './components/registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root'));
registerServiceWorker();
