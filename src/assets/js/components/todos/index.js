import React, { PureComponent, PropTypes } from 'react';
import Editor from '../common/Editor';
import { TODO } from '../../constants';
import TodoItem from '../common/Todo';
import { Todo } from '../../models';

class Todos extends PureComponent {
    
    static propTypes = {
        category: PropTypes.object,
        updateItems: PropTypes.func.isRequired,
        validateName: PropTypes.func.isRequired,
        isError: PropTypes.bool.isRequired,
        showPopupError: PropTypes.bool.isRequired,
        errorMessage: PropTypes.string.isRequired,
        clearError: PropTypes.func.isRequired,
        setError: PropTypes.func.isRequired,
    };
    
    static defaultProps = {
        category: {
            name: 'default',
            children: []
        }
    };
    
    constructor(props) {
        super(props);
        
        this.validate = this.props.validateName(TODO);
        this.setError = this.props.setError(TODO);
        
        this.add = (name, cb) => {
            if (!this.validate(this.props.category.id)(name)) {
                this.props.updateItems({
                    id: this.props.category.id,
                    mapper: function (categories, cb) {
                        const nextItem = this.addChild(new Todo({name}));
                        categories.push(nextItem);
                        return nextItem
                    }
                }, cb);
            } else {
                this.setError('Current To-Do item already exists', false)
            }
        };
        
        this.toggleTodo = id => this.props.updateItems({
            id: this.props.category.id,
            mapper: function(categories) {
                const nextItem = this.updateChildren(this.children.map(item=>item.id == id ? item.toggleIsComplete() : item));
                categories.push(nextItem);
                return nextItem;
            }
        })
    }
    
    render() {
        return (
            <section className="todos">
                <h2 className="category-title">
                    {this.props.category.name}
                </h2>
                <section className="editor-area">
                    <Editor
                        type={TODO}
                        errorType={this.props.errorType}
                        placeholder={'Enter TODO title'}
                        showPopupError={this.props.showPopupError}
                        add={this.add}
                        clearError={this.props.clearError}
                        isError={this.props.isError}
                        errorMessage={this.props.errorMessage}
                    />
                </section>
                <section className="list">
                    {this.props.category.children
                        .filter(child=>child.type == TODO)
                        .map(todo=>
                            <TodoItem
                                toggle={this.toggleTodo}
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