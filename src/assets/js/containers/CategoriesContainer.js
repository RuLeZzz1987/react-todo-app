import React, { Component } from 'react';
import { Container } from 'flux/utils'
import { CategoryStore, FilterStore, TodoStore } from '../stores';
import Categories from '../components/categories';
import { CategoryActions } from '../actions';
import { reduceWithCondition } from '../helpers';

class CategoriesContainer extends Component {

  static getStores() {
    return [CategoryStore, FilterStore, TodoStore]
  }

  static calculateState(prevState, props) {
    const { categoryId, todoId } = props.params;

    const todos = TodoStore.getState();
    const filters = FilterStore.getState();
    let ids = Object.keys(
      reduceWithCondition(
        reduceWithCondition(CategoryStore.getState())('parentId', undefined)
      )('isComplete', filters.showDone));

    return {
      ids,
      selectedId: props.categoryId,
      isTodoFound: Object.keys(todos).some(id => id == todoId && todos[id].parentId == categoryId)
    }
  }

  render() {
    return (
      <Categories
        {...this.state}
        {...this.props}
        addCategory={CategoryActions.addCategory}
      />
    )
  }
}

export default Container.create(CategoriesContainer, {withProps: true})