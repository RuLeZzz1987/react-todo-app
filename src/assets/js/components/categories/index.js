import React, { Component } from 'react';
import Editor from '../common/Editor';
import Category from '../common/Category';

class Categories extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            categories: {'Category 1': {}},
            categoryName: '',
        };
        
        this.add = this.add.bind(this);
        this.changeCategoryName = this.changeCategoryName.bind(this);
    }
    
    add() {
        if (!this.state.categories.hasOwnProperty(this.state.categoryName)) {
            this.setState({
                categories: {
                    ...this.state.categories,
                    [this.state.categoryName]: {}
                }
            })
        }
    }
    
    changeCategoryName(e) {
        this.setState({categoryName: e.target.value})
    }
    
    render() {
        return (
            <aside className="categories">
                <section className="editor-area">
                    <Editor
                        placeholder={'Enter category title'}
                        value={this.state.categoryName}
                        add={this.add}
                        onChange={this.changeCategoryName}
                    />
                </section>
                <section className="categories-tree">
                    {Object.keys(this.state.categories).map(name=>
                        <Category
                            key={name}
                            name={name}
                        />
                    )}
                </section>
            </aside>
        )
    }
}

export default Categories