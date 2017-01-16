import React, { PureComponent, PropTypes } from "react";
import Categories from "../categories";
import { TODO } from "../../constants";
import { isNameExists } from "../../helpers/isNameExists";
import ModalError from "../common/ModalError";
import { update } from "../../helpers/recursiveUpdate";


class Main extends PureComponent {

  static propTypes = {
    categories: PropTypes.array.isRequired,
    updateCategories: PropTypes.func.isRequired,
    showDone: PropTypes.bool.isRequired,
    todos: PropTypes.element
  };

  static defaultProps = {
    categories: []
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: undefined, //props.categories.find(category=>category.isRoot),
      error: undefined,
    };

    this.selectCategory = category => this.setState({selectedCategory: category});

    this.addRootCategory = (category, cb) => this.props.updateCategories(this.props.categories.concat(category),
      () => {
        this.selectCategory(category);
        cb()
      });
    this.updateItems = (props, cb) => this.props.updateCategories(update({
        items: this.props.categories,
        ...props,
        hook: mapped => this.selectCategory(mapped())
      }), cb
    );

    this.validateName = type => id => name => {
      return this.validate({id, type, name, items: this.props.categories});
    };

    this.validate = ({id, type, items, name}) =>
      items.some(item => {
        if (item.type == TODO) return false;
        return !id || item.id == id ?
          isNameExists(type)(name)(items, item)
          : this.validate({id, type, items: item.children, name})
      });

    this.clearError = () => this.setState({error: undefined});
    this.setError = type => (message, popup) => this.setState({error: {type, message, popup,}});
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
          error={this.state.error}
          showDone={this.props.showDone}
          selectedCategory={this.state.selectedCategory}
          setError={this.setError}
          clearError={this.clearError}
          validateName={this.validateName}
          addRootCategory={this.addRootCategory}
          categories={this.props.categories}
          updateItems={this.updateItems}
          selectCategory={this.selectCategory}
        />
        {this.props.todos && React.cloneElement(this.props.todos, {
          error: this.state.error,
          showDone: this.props.showDone,
          setError: this.setError,
          clearError: this.clearError,
          validateName: this.validateName,
          category: this.state.selectedCategory,
          updateItems: this.updateItems,
        })}
      </main>
    )
  }
}

export default Main;