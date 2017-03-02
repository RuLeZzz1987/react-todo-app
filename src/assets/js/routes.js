import React from "react";
import { Route } from "react-router";
import App from "./components";
import Todos from "./components/todos";
import Editor from "./components/todo-editor";

export default (
  <Route path="/" component={App}>
    <Route path=":categoryId" components={{ todos: Todos }}>
      <Route path=":todoId" components={{ editor: Editor }} />
    </Route>
  </Route>
);
