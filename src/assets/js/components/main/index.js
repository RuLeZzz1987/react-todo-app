import React, { PureComponent, PropTypes } from "react";
import { Categories } from "../../containers";
import { TODO, CATEGORY } from "../../constants";
import { isCategoryNameExists } from "../../helpers/isNameExists";
import ModalError from "../common/ModalError";
import { update } from "../../helpers/recursiveUpdate";
import { RightSideSection } from '../common/Wrappers';
import { findItem } from '../../helpers/findItem';

class Main extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      error: undefined,
      moveToCategoryId: ''
    };

    this.addRootCategory = (category, cb) => this.props.updateCategories(this.props.categories.concat(category), cb);
    this.updateItems = (props, cb) => this.props.updateCategories(update({
        items: this.props.categories,
        ...props,
      }), cb
    );

    this.validateName = type => id => name => {
      return this.validate({id, type, name, items: this.props.categories});
    };

    this.validate = ({id, type, items, name}) =>
      items.some(item => {
        if (item.type == TODO) {
          return item.name == name;
        }
        return !id || item.id == id ?
          isCategoryNameExists(type)(name)(items, item)
          : this.validate({id, type, items: item.children, name})
      });

    this.clearError = () => this.setState({error: undefined});
    this.setError = type => (message, popup) => this.setState({error: {type, message, popup,}});
    this.moveTodoToCategory = id => this.setState({moveToCategoryId: id});
  }

  render() {
    return (
      <main
        className="main"
      >
        <ModalError
          error={this.state.error}
          onClose={this.clearError}
        />
        <Categories
          params={this.props.params}
        />
        <RightSideSection>
          {this.props.todos && React.cloneElement(this.props.todos, {
            error: this.state.error,
            showDone: this.props.showDone,
            setError: this.setError,
            clearError: this.clearError,
            validateName: this.validateName,
            categories: this.props.categories,
            updateItems: this.updateItems,
            todo: this.props.todo,
            category: this.props.category
          })}
        </RightSideSection>
      </main>
    )
  }
}

const injectCategory = ComposedComponent => class extends PureComponent {
  render() {
    let category;
    let isTodoFound = false;

    if (this.props.params.categoryId) {
      category = findItem(CATEGORY)(this.props.categories, this.props.params.categoryId);

      if (category) {
        isTodoFound = category.children.some(item => item.id == this.props.params.todoId)
      }
    }
    return (
      <ComposedComponent
        {...this.props}
        category={category}
        isTodoFound={isTodoFound}
      />
    )
  }
};

export default injectCategory(Main);