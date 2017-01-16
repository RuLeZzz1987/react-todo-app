import React, { PureComponent, PropTypes } from 'react';
import Editor from '../common/Editor';
import { TODO } from '../../constants';
import TodoItem from '../common/Todo';
import { Todo } from '../../models';
import isAlphaNumeric from '../../helpers/isAlphaNumeric';
import { RightSideSection } from '../common/Wrappers';
import { Exception } from '../../helpers/PropTypes';

class Todos extends PureComponent {
    
    static propTypes = {
        category: PropTypes.object,
        updateItems: PropTypes.func,
        validateName: PropTypes.func,
        error: Exception,
        clearError: PropTypes.func,
        setError: PropTypes.func,
        showDone: PropTypes.bool,
    };
    
    constructor(props) {
        super(props);
        
        this.validate = this.props.validateName(TODO);
        this.setError = this.props.setError(TODO);
        
        this.add = (name, cb) => {
            if (!isAlphaNumeric(name)) return this.setError('To-Do item name should contains at least one alphanumeric char', false);
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
        if (!this.props.category) return (<RightSideSection/>);
        
        return (
            <RightSideSection>
                <h2 className="category-title">
                    {this.props.category && this.props.category.name}
                </h2>
                <section className="editor-area">
                    <Editor
                        error={this.props.error}
                        type={TODO}
                        placeholder={'Enter TODO title'}
                        add={this.add}
                        clearError={this.props.clearError}
                    />
                </section>
                <section className="list">
                    {this.props.category && this.props.category.children
                        .filter(child=>child.type == TODO && (this.props.showDone ? true : !child.isComplete))
                        .map(todo=>
                            <TodoItem
                                toggle={this.toggleTodo}
                                key={todo.id}
                                todo={todo}
                            />
                        )}
                </section>
            </RightSideSection>
        )
    }
}



export default Todos