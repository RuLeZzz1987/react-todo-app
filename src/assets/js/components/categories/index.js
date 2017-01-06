import React, { PureComponent, PropTypes } from 'react';
import Editor from '../common/Editor';
import CategoryItem from '../common/Category';
import { Category } from '../../models';

class Categories extends PureComponent {
    
    static propTypes = {
        categories: PropTypes.array.isRequired,
        updateCategories: PropTypes.func.isRequired
    };
    
    constructor(props) {
        super(props);
        
        this.state = {
            isError: false,
            errorMessage: ''
        };
        
        this.add = this.add.bind(this);
        this.addChild = this.addChild.bind(this);
        this.changeCategoryName = this.changeCategoryName.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
        
        this.clearError = () => this.setState({isError: false, errorMessage: ''})
    }
    
    add(name, callback) {
        if (!this.props.categories.some(category=> category.name == name)) {
            this.props.updateCategories(this.props.categories.concat(new Category({name})), callback)
        } else {
            this.setState({
                isError: true,
                errorMessage: 'Current category name already exists'
            })
        }
    }
    
    changeCategoryName(id, name) {
        this.props.updateCategories(
            this.update({
                categories: this.props.categories,
                id,
                mapper: function (categories) {
                    categories.push(this.updateName(name))
                }
            })
        )
    }
    
    removeCategory(id) {
        this.props.updateCategories(this.update({
                categories: this.props.categories,
                id,
                mapper: ()=> {
                }
            })
        )
    }
    
    addChild(id, name) {
        this.props.updateCategories(this.update({
                categories: this.props.categories,
                id,
                mapper: function (categories) {
                    return categories.push(this.addChild(new Category({name})))
                }
            })
        )
    }
    
    update({categories, id, mapper, isUpdated = {value: false}}) {
        if (categories.length == 0) return categories;
        const next = categories.reduce((cat, category)=> {
            if (category.id == id) {
                isUpdated.value = true;
                mapper.call(category, cat);
            } else {
                cat.push(category.updateChildren(this.update({categories: category.children, id, mapper, isUpdated})));
            }
            return cat
        }, []);
        return isUpdated.value ? next : categories;
    }
    
    render() {
        return (
            <aside className="categories">
                <section className="editor-area">
                    <Editor
                        placeholder={'Enter category title'}
                        add={this.add}
                        clearError={this.clearError}
                        isError={this.state.isError}
                        errorMessage={this.state.errorMessage}
                    />
                </section>
                <section className="categories-tree">
                    {this.props.categories.map(category=>
                        <CategoryItem
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