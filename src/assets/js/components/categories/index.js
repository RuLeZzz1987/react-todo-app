import React, { PureComponent, PropTypes } from 'react';
import Editor from '../common/Editor';
import CategoryItem from '../common/Category';
import { Category } from '../../models';

class Categories extends PureComponent {
    
    static propTypes = {
        categories: PropTypes.array.isRequired,
        updateItems: PropTypes.func.isRequired,
        selectCategory: PropTypes.func.isRequired,
        addRootCategory: PropTypes.func.isRequired
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
            this.props.addRootCategory(new Category({name}), callback)
        } else {
            this.setState({
                isError: true,
                errorMessage: 'Current category name already exists'
            })
        }
    }
    
    changeCategoryName(id, name) {
        this.props.updateItems({
            id,
            mapper: function (categories) {
                const nextCategory = this.updateName(name);
                categories.push(this.updateName(name));
                return nextCategory;
            }
        })
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