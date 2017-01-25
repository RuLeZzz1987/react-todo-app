import React, { Component, PropTypes } from 'react';
import { TodoStore, FilterStore } from '../stores';
import { Container } from 'flux/utils';
import Header from '../components/header';
import { FilterActions } from '../actions';

class HeaderContainer extends Component {

  static propTypes = {
    todoId: PropTypes.string
  };

  static getStores() {
    return [TodoStore, FilterStore];
  }

  static calculateState(prevState, props) {
    const filterState = FilterStore.getState();
    const todos = TodoStore.getState();
    const todosIds = Object.keys(todos);

    if (props.todoId) {
      const todo = todosIds.reduce((todo, id)=>{
        if (id = props.todoId) {
          todo = todos[id];
        }
        return todo;
      });

      var title = todo && todo.name;
    }

    return {
      ...filterState,
      completed: todosIds.reduce((sum, todoId) => todos[todoId].isComplete ? ++sum : sum, 0),
      total: todosIds.length,
      title,
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

export default Container.create(HeaderContainer, {withProps: true});