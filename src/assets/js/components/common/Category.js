import React, { PureComponent, PropTypes } from 'react';
import { CATEGORY } from '../../constants';
import { Link } from 'react-router';
import { hide, invisible } from '../../helpers/hide';

class Category extends PureComponent {

  static propTypes = {
    category: PropTypes.object.isRequired,
    changeCategoryName: PropTypes.func.isRequired,
    removeCategory: PropTypes.func.isRequired,
    addChild: PropTypes.func.isRequired,
    selectedCategory: PropTypes.string,
    showDone: PropTypes.bool.isRequired,
    selectedTodoId: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      isEditMode: false,
      name: props.category.name,
      showFullName: false,
      isCollapsed: false
    };

    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.editCategoryName = this.editCategoryName.bind(this);
    this.changeCategoryName = this.changeCategoryName.bind(this, props.category.id);
    this.removeCategory = () => this.props.removeCategory(this.props.category.id);
    this.showFullName = () => this.setState({showFullName: true});
    this.hideFullName = () => this.setState({showFullName: false});
    this.addChild = () => this.props.addChild(this.props.category.id, this.generateChildName(1));
    this.toggleExpanded = () => this.setState({isCollapsed: !this.state.isCollapsed});
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
    this.setState({isEditMode: !this.state.isEditMode}, () => {
      if (this.state.isEditMode) {
        this.nameInput.focus();
      }
    })
  }

  editCategoryName(e) {
    this.setState({name: e.target.value})
  }

  changeCategoryName(id) {
    this.toggleEditMode();
    if (this.state.name != this.props.category.name) {
      this.props.changeCategoryName(id, this.state.name)
    }
  }

  render() {
    const isSelected = this.props.category.id == this.props.selectedCategory;
    const expandedClassName = this.state.isCollapsed ? 'fa fa-plus' : 'fa fa-minus';
    const hideExpandedBtn = this.props.category.children.filter(el => el.type == CATEGORY).length == 0;

    return (
      <section>
        <Link to={`/${this.props.category.id}`}>
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
                value={this.state.name}
                onChange={this.editCategoryName}
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
            <div className={hide(this.props.isTodoFound, "remove-add-controls")}>
              <i className="fa fa-trash"
                 onClick={this.removeCategory}
              />
              <i className="fa fa-plus"
                 onClick={this.addChild}
              />
            </div>
            {this.state.showFullName &&
            <div className="fullname">
              {this.props.category.name}
            </div>}
          </section>
        </Link>
        <section className={hide(this.state.isCollapsed, 'category-children')}>
          {this.props.category.children
            .filter(category => category.type == CATEGORY && (this.props.showDone ? true : !category.isComplete))
            .reverse()
            .map(category => <Category
                key={category.id}
                isTodoFound={this.props.isTodoFound}
                showDone={this.props.showDone}
                addChild={this.props.addChild}
                selectedTodoId={this.props.selectedTodoId}
                selectedCategory={this.props.selectedCategory}
                category={category}
                removeCategory={this.props.removeCategory}
                changeCategoryName={this.props.changeCategoryName}
              />
            )}
        </section>
      </section>
    )
  }
}

export default Category