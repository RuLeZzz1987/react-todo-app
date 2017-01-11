import React, { Component } from 'react';
import Header from './header';
import Main from './main';
import { Category, Todo } from '../models';

class App extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            categories: [new Category({name: 'Category_1', isRoot: true, children: [new Todo({name: 'To-Do Item #1'}), new Category({name: 'Category_1_1'})]})]
        };
        
        this.updateCategories = (categories, cb) => this.setState({categories}, cb);
       
    }
    
    render() {
        return (
            <div>
                <Header
                    categories={this.state.categories}
                />
                <Main
                    categories={this.state.categories}
                    updateCategories={this.updateCategories}
                />
            </div>
        )
    }
}

export default App;