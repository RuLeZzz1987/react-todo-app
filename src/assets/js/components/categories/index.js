import React, { PureComponent, PropTypes } from 'react';
import Editor from '../common/Editor';
import CategoryItem from '../common/Category';
import { Category } from '../../models';
import { CATEGORY, TODO } from '../../constants';
import isAlphaNumeric from '../../helpers/isAlphaNumeric';
import { Exception } from '../../helpers/PropTypes';

class Categories extends PureComponent {

  static propTypes = {
    categories: PropTypes.array.isRequired,
    updateItems: PropTypes.func.isRequired,
    addRootCategory: PropTypes.func.isRequired,
    validateName: PropTypes.func.isRequired,
    error: Exception,
    clearError: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    selectedCategory: PropTypes.string,
    showDone: PropTypes.bool.isRequired,
    selectedTodoId: PropTypes.string,
    isTodoFound: PropTypes.bool.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.add = this.add.bind(this);
    this.moveTo = this.moveTo.bind(this);
    this.addChild = this.addChild.bind(this);
    this.changeCategoryName = this.changeCategoryName.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
    this.validate = this.props.validateName(CATEGORY);
    this.setError = this.props.setError(CATEGORY);
  }

  add(name, callback) {
    if (!isAlphaNumeric(name)) return this.setError('Category name should contains at least 1 alphanumeric char', false);
    if (!this.validate(null)(name)) {
      this.props.addRootCategory(new Category({name, isRoot: true}), callback)
    } else {
      this.setError('Current category name already exists', false)
    }
  }

  changeCategoryName(id, name) {
    if (name.trim().length == 0) return this.setError('Category name should contains at least 1 alphanumeric char', true);
    if (!this.validate(id)(name)) {
      this.props.updateItems({
        id,
        mapper: function (categories) {
          const nextCategory = this.updateName(name);
          categories.push(this.updateName(name));
          return nextCategory;
        }
      })
    } else {
      this.setError('Current category name already exists', true)
    }

  }

  removeCategory(id) {
    this.props.updateItems({
      id,
      mapper: () => {
      }
    })
  }

  addChild(id, name) {
    this.props.updateItems({
      id,
      mapper: function (categories) {
        const nextCategory = this.addChild(new Category({name}));
        categories.push(nextCategory);
        return nextCategory;
      }
    })
  }

  moveTo(target) {
    let todo;
    const { selectedTodoId:todoId, selectedCategory:currentCategoryId } = this.props;

    const afterRemoveCallBack = () => {

      if (!todo) {
        this.setError(`Todo wasn't found in source Category ${currentCategoryId} while was moving to the target ${target} Category`, true);
        return;
      }

      if (!this.props.validateName(TODO)(todo.id)(todo.name)) {
        this.props.updateItems({
          id: target,
          mapper: function (categories) {
            const nextCategory = this.addChild(todo);
            categories.push(nextCategory);
            return nextCategory;
          }
        });
        this.context.router.push(`/${target}/${todo.id}`)
      } else {
        this.props.updateItems({
          id: currentCategoryId,
          mapper: function (categories) {
            const nextCategory = this.addChild(todo);
            categories.push(nextCategory);
            return nextCategory;
          }
        });
        this.setError(`Todo with ${todo.name} name is already exists`, true)
      }
    };

    this.props.updateItems({
      id: currentCategoryId,
      mapper: function(categories) {
        const nextCategory = this.updateChildren(this.children.filter(item=>{
          if (item.id == todoId) {
            todo = item;
          }
          return item.id != todoId
        }));
        categories.push(nextCategory);
        return nextCategory;
      }
    }, afterRemoveCallBack);

  }

  render() {
    return (
      <aside className="categories">
        <section className="editor-area">
          <Editor
            error={this.props.error}
            type={CATEGORY}
            placeholder={'Enter category title'}
            add={this.add}
            clearError={this.props.clearError}
            isError={this.props.isError}
          />
        </section>
        <section className="categories-tree">
          {this.props.categories
            .filter(category => category.type == CATEGORY && (this.props.showDone ? true : !category.isComplete))
            .map(category =>
              <CategoryItem
                moveTo={this.moveTo}
                isTodoFound={this.props.isTodoFound}
                selectedTodoId={this.props.selectedTodoId}
                showDone={this.props.showDone}
                selectedCategory={this.props.selectedCategory}
                addChild={this.addChild}
                removeCategory={this.removeCategory}
                changeCategoryName={this.changeCategoryName}
                key={category.id}
                category={category}
              />
            )}
        </section>
      </aside>
    )
  }
}

export default Categories