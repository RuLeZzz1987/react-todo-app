import React, { Component } from 'react';
import { TodoStore, FilterStore } from '../stores';
import { Container } from 'flux/utils';
import Header from '../components/header';
import { FilterActions } from '../actions';

class HeaderContainer extends Component {

  static getStores() {
    return [TodoStore, FilterStore];
  }

  static calculateState() {
    const filterState = FilterStore.getState();
    const todos = TodoStore.getState();
    const todosIds = Object.keys(todos);

    return {
      ...filterState,
      completed: todosIds.reduce((sum, todoId) => todos[todoId].isComplete ? ++sum : sum, 0),
      total: todosIds.length
    };
  }

  render() {
    return (
      <Header
        {...this.state}
        {...FilterActions}
      />
    );
  }
}

export default Container.create(HeaderContainer);