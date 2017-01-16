import React from "react";
import { render } from "react-dom";
import "../styles/styles.scss";
import { Router, browserHistory } from "react-router";
import routes from './routes';

render(
  <Router
    history={browserHistory}
    routes={routes}
  />
  , document.querySelector('#root'));