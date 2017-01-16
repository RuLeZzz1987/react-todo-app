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
        selectCategory: PropTypes.func.isRequired,
        addRootCategory: PropTypes.func.isRequired,
        validateName: PropTypes.func.isRequired,
        error: Exception,
        clearError: PropTypes.func.isRequired,
        setError: PropTypes.func.isRequired,
        selectedCategory: PropTypes.object,
        showDone: PropTypes.bool.isRequired,
    };
    
    constructor(props) {
        super(props);
        
        this.add = this.add.bind(this);
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
            mapper: ()=> {
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
    
    render() {
        return (
            <aside className="categories">
                <section className="editor-area">
                    <Editor
                        error={this.props.error}
                        type={CATEGORY}
                        errorType={this.props.errorType}
                        placeholder={'Enter category title'}
                        add={this.add}
                        clearError={this.props.clearError}
                        showPopupError={this.props.showPopupError}
                        isError={this.props.isError}
                        errorMessage={this.props.errorMessage}
                    />
                </section>
                <section className="categories-tree">
                    {this.props.categories
                        .filter(category=>category.type == CATEGORY && (this.props.showDone ? true : !category.isComplete))
                        .map(category=>
                        <CategoryItem
                            showDone={this.props.showDone}
                            selectedCategory={this.props.selectedCategory}
                            selectCategory={this.props.selectCategory}
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