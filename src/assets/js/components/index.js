import React, { Component } from "react";
import { Header } from "../containers";
import Main from "./main";
import { Category, Todo } from "../models";

const defaultCategories = [new Category({name: 'Category_1', isRoot: true, children: [new Todo({name: 'To-Do Item #1'}), new Category({name: 'Category_1_1'})]})];

class App extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            categories: defaultCategories,
            showDone: true,
            filteredCategories: defaultCategories
        };
        
        this.updateCategories = (categories, cb) => this.setState({categories, filteredCategories: categories}, cb);
    }
    
    render() {
        return (
            <div>
                <Header
                    todoId={this.props.params.todoId}
                />
                <Main
                    params={this.props.params}
                />
            </div>
        )
    }
}

export default App;