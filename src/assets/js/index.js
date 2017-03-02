import React from "react";
import { render } from "react-dom";
import { Router, browserHistory } from "react-router";
import "../styles/styles.scss";
import routes from "./routes";

render(
  <Router history={browserHistory} routes={routes} />,
  document.querySelector("#root")
);
