import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { CategoryStore } from '../stores';
import { Category } from '../components/common'

class CategoryContainer extends Component {

  static getStores() {
    return [CategoryStore]
  }

  static calculateState(prevState, props) {
    const categories = CategoryStore.getState();
    const category = categories[props.id];

    return {
      category,
    }
  }

  render() {
    if (!this.state.category) return null;

    return (
      <Category
        {...this.state}
        {...this.props}
      />
    )
  }

}

export default Container.create(CategoryContainer, {withProps: true})