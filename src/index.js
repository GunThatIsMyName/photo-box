import React from 'react';
import ReactDOM from 'react-dom';
import App from './part2/App';
import './index.css';
import {AppProvider} from "./part2/comp"

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
