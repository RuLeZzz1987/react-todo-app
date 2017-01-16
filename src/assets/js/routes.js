import React from 'react';
import { Route } from 'react-router';
import App from './components';
import Todos from './components/todos';
import Editor from './components/todo-editor';

export default (
  <Route path="/" component={App}>
    <Route path=":id" components={{todos: Todos}}>
      <Route path=":id" components={{editor: Editor}}/>
    </Route>
  </Route>
)