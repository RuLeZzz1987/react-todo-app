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
    let categories = reduceWithCondition(CategoryStore.getState())('parentId', undefined);

    if (!filters.showDone) {
      categories = reduceWithCondition(categories)('isComplete', false)
    }

    return {
      ids: Object.keys(categories),
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