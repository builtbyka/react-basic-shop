require('es6-promise').polyfill();
import React from 'react';
import ReactDOM from 'react-dom';
import Shop from './Shop.jsx';

//Render application in browser
ReactDOM.render(<Shop/>, document.getElementById('shop'))
