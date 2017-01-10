import React, { PureComponent, PropTypes } from 'react';
import Editor from '../common/Editor';
import { TODO } from '../../constants';
import TodoItem from '../common/Todo';
import { Todo } from '../../models';

class Todos extends PureComponent {
    
    static propTypes = {
        category: PropTypes.object,
        updateItems: PropTypes.func.isRequired
    };
    
    static defaultProps = {
        category: {
            name: 'default',
            children: [new Todo({name: 'To-Do Item #1'})]
        }
    };
    
    constructor(props) {
        super(props);
        
        this.state = {
            isError: false,
            errorMessage: ''
        };
        
        this.clearError = () => this.setState({isError: false, errorMessage: ''});
        
        this.add = (name, cb) => this.props.updateItems({
            id: this.props.category.id,
            mapper: function (categories, cb) {
                const nextItem = this.addChild(new Todo({name}));
                categories.push(nextItem);
                return nextItem
            }
        }, cb);
    }
    
    render() {
        return (
            <section className="todos">
                <h2 className="category-title">
                    {this.props.category.name}
                </h2>
                <section className="editor-area">
                    <Editor
                        placeholder={'Enter TODO title'}
                        add={this.add}
                        clearError={this.clearError}
                        isError={this.state.isError}
                        errorMessage={this.state.errorMessage}
                    />
                </section>
                <section className="list">
                    {this.props.category.children
                        .filter(child=>child.type == TODO)
                        .map(todo=>
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                            />
                        )}
                </section>
            </section>
        )
    }
}

export default Todos