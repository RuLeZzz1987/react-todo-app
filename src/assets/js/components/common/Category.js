import React, { PureComponent, PropTypes } from 'react';
import { CATEGORY } from '../../constants';
import { Link } from 'react-router';

class Category extends PureComponent {

  static propTypes = {
    category: PropTypes.object.isRequired,
    changeCategoryName: PropTypes.func.isRequired,
    removeCategory: PropTypes.func.isRequired,
    addChild: PropTypes.func.isRequired,
    selectCategory: PropTypes.func.isRequired,
    selectedCategory: PropTypes.object,
    showDone: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isEditMode: false,
      name: props.category.name,
      showFullName: false,
      isExpanded: true
    };

    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.editCategoryName = this.editCategoryName.bind(this);
    this.changeCategoryName = this.changeCategoryName.bind(this, props.category.id);
    this.removeCategory = () => this.props.removeCategory(this.props.category.id);
    this.showFullName = () => this.setState({showFullName: true});
    this.hideFullName = () => this.setState({showFullName: false});
    this.addChild = () => this.props.addChild(this.props.category.id, this.generateChildName(1));
    this.selectCategory = () => this.props.selectCategory(this.props.category);
    this.toggleExpanded = () => this.setState({isExpanded: !this.state.isExpanded});
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
    const isSelected = this.props.selectedCategory && this.props.category.id == this.props.selectedCategory.id;
    const expandedClassName = this.state.isExpanded ? 'fa fa-minus' : 'fa fa-plus';
    const showExpandedBtn = this.props.category.children.filter(el => el.type == CATEGORY).length > 0;
    const childrenExpandedClassName = this.state.isExpanded ? 'category-children' : 'category-children hide';

    return (
      <section>
        <Link to={`/${this.props.category.id}`}>
          <section
            style={{backgroundColor: isSelected ? '#f0f757' : '#fff'}}
            onClick={this.selectCategory}
            className="category"
          >
            <i
              style={{visibility: showExpandedBtn ? 'visible' : 'hidden'}}
              className={expandedClassName}
              onClick={this.toggleExpanded}
            />
            <i
              style={{visibility: this.props.category.isComplete ? 'visible' : 'hidden'}}
              className="fa fa-check"
            />
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
              className="fa fa-edit"
              onClick={this.toggleEditMode}
            />
            <div className="remove-add-controls">
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
        <section className={childrenExpandedClassName}>
          {this.props.category.children
            .filter(category => category.type == CATEGORY && (this.props.showDone ? true : !category.isComplete))
            .reverse()
            .map(category => <Category
                key={category.id}
                showDone={this.props.showDone}
                addChild={this.props.addChild}
                selectedCategory={this.props.selectedCategory}
                selectCategory={this.props.selectCategory}
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