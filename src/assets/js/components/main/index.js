import React, { PureComponent, PropTypes } from "react";
import Categories from "../categories";
import { TODO } from "../../constants";
import { isNameExists } from "../../helpers/isNameExists";
import ModalError from "../common/ModalError";
import { update } from "../../helpers/recursiveUpdate";
import { RightSideSection } from '../common/Wrappers';

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
      error: undefined,
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
          selectedCategory={this.props.params.id}
          setError={this.setError}
          clearError={this.clearError}
          validateName={this.validateName}
          addRootCategory={this.addRootCategory}
          categories={this.props.categories}
          updateItems={this.updateItems}
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
          })}
        </RightSideSection>
      </main>
    )
  }
}

export default Main;