import React, { Component } from 'react';
import Editor from '../common/Editor';
import CategoryItem from '../common/Category';
import { Category } from '../../models';

class Categories extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            categories: [new Category({name: 'Category_1', children: [new Category({name: 'Category_1_1'})]})],
            isError: false,
            errorMessage: ''
        };
        
        this.add = this.add.bind(this);
        this.changeCategoryName = this.changeCategoryName.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
        
        this.clearError = () => this.setState({isError: false, errorMessage: ''})
    }
    
    add(name, callback) {
        if (!this.state.categories.some(category=> category.name == name)) {
            this.setState({
                categories: this.state.categories.concat(new Category({name}))
            }, callback)
        } else {
            this.setState({
                isError: true,
                errorMessage: 'Current category name already exists'
            })
        }
    }
    
    changeCategoryName(id, name) {
        this.setState({
            categories: this.update(
                this.state.categories,
                id,
                name,
                function (categories) {
                    categories.push(this.updateName(name))
                }
            )
        })
    }
    
    removeCategory(id) {
        this.setState({
            categories: this.update(
                this.state.categories,
                id,
                ()=> {
                }
            )
        })
    }
    
    update(categories, id, mapper, isUpdated = {value: false}) {
        if (categories.length == 0) return categories;
        const next = categories.reduce((cat, category)=> {
            if (category.id == id) {
                isUpdated.value = true;
                mapper.call(category, cat);
            } else {
                cat.push(category.updateChildren(this.update(category.children, id, mapper, isUpdated)));
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
                    {this.state.categories.map(category=>
                        <CategoryItem
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