import React, { PureComponent, PropTypes } from "react";
import { Link } from "react-router";
import { hide, invisible } from "../../helpers/hide";
import { Category as CategoryContainer } from "../../containers";
import CategoryPropTypes from '../../helpers/PropTypes/Category';

const {object, string, bool, func} = PropTypes;

class Category extends PureComponent {

  static propTypes = {
    categories: object,
    category: CategoryPropTypes.isRequired,
    id: string.isRequired,
    params: object.isRequired,
    isTodoFound: bool.isRequired,
    editCategory: func.isRequired,
    removeCategory: func.isRequired,
    moveTo: func.isRequired,
    addCategory: func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isEditMode: false,
      showFullName: false,
      isCollapsed: false
    };

    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.changeCategoryName = this.changeCategoryName.bind(this);
    this.removeCategory = e => {
      e.preventDefault();
      this.props.removeCategory(this.props.id);
    };
    this.showFullName = () => this.setState({showFullName: true});
    this.hideFullName = () => this.setState({showFullName: false});
    this.addChild = e => {
      e.preventDefault();
      this.props.addCategory({parentId: this.props.id, name: this.generateChildName(1)});
    };
    this.toggleExpanded = e => {
      e.preventDefault();
      this.setState({isCollapsed: !this.state.isCollapsed});
    };
    this.moveTodo = e => {
      e.preventDefault();
      this.props.moveTo({
        sourceId: this.props.params.categoryId,
        todoId: this.props.params.todoId,
        targetId: this.props.id
      });
    }
  }

  generateChildName(n) {
    const nextChildName = `${this.props.category.name}_${n}`;
    return this.props.category.children.some(child => child.name == nextChildName)
      ?
      this.generateChildName(n + 1)
      :
      nextChildName;
  }

  toggleEditMode() {
    this.nameInput.value = this.props.category.name;
    this.setState({isEditMode: !this.state.isEditMode}, () => {
      if (this.state.isEditMode) {
        this.nameInput.focus();
      }
    });
  }

  changeCategoryName() {
    this.toggleEditMode();
    if (this.state.name != this.props.category.name) {
      this.props.editCategory(this.nameInput.value, this.props.id)
    }
  }

  render() {
    const isSelected = this.props.id == this.props.selectedId;
    const expandedClassName = this.state.isCollapsed ? 'fa fa-plus' : 'fa fa-minus';
    const hideExpandedBtn = this.props.category.subCategories.length == 0;

    return (
      <section>
        <Link to={`/${this.props.id}`}>
          <section
            style={{backgroundColor: isSelected ? '#f0f757' : '#fff'}}
            className="category"
          >
            <i
              className={invisible(hideExpandedBtn, expandedClassName)}
              onClick={this.toggleExpanded}
            />
            <i className={invisible(!this.props.category.isComplete || this.props.isTodoFound, "fa fa-check")}/>
            {this.state.isEditMode ?
              <input
                ref={el => {
                  this.nameInput = el
                }}
                defaultValue={this.props.category.name}
                onBlur={this.changeCategoryName}
                className="category-editor"
              />
              :
              <h3
                className="displayed-name"
                onMouseOver={this.showFullName}
                onMouseOut={this.hideFullName}
              >
                {this.props.category.name}
              </h3>
            }
            <i
              className={hide(this.props.isTodoFound, "fa fa-edit")}
              onClick={this.toggleEditMode}
            />
            {!this.props.isTodoFound ?
              <div className="remove-add-controls">
                <i className="fa fa-trash"
                   onClick={this.removeCategory}
                />
                <i className="fa fa-plus"
                   onClick={this.addChild}
                />
              </div>
              :
              <div className={hide(isSelected, "remove-add-controls")}>
                <i className="fa fa-long-arrow-left"
                   onClick={this.moveTodo}
                />
              </div>
            }
            {this.state.showFullName &&
            <div className="fullname">
              {this.props.category.name}
            </div>}
          </section>
        </Link>
        <section className={hide(this.state.isCollapsed, 'category-children')}>
          {this.props.category.subCategories
            .reverse()
            .map(id =>
              <CategoryContainer
                id={id}
                key={id}
                params={this.props.params}
                isTodoFound={this.props.isTodoFound}
              />
            )}
        </section>
      </section>
    )
  }
}

export default Category