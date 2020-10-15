import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; 

import Header from './components/Header'
import './styles/index.css'


export const globalComp = ReactDOM.render(
  <React.StrictMode>
    <App ref={(appComp) => {window.appComp = appComp}}  />
  </React.StrictMode>,
  document.getElementById('root')
);
