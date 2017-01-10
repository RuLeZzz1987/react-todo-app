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
            children: [new Todo({name: 'To-Do Item #1'})]
        }
    };
    
    constructor(props) {
        super(props);
        
        this.validate = this.props.validateName(TODO)(this.props.category.id);
        
        this.add = (name, cb) => {
            if (!this.validate(name)) {
                this.props.updateItems({
                    id: this.props.category.id,
                    mapper: function (categories, cb) {
                        const nextItem = this.addChild(new Todo({name}));
                        categories.push(nextItem);
                        return nextItem
                    }
                }, cb);
            } else {
                this.props.setError('Current To-Do item already exists', false)
            }
        }
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