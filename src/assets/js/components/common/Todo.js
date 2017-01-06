import React, { PureComponent, PropTypes } from 'react';

class Todo extends PureComponent {
    
    static propTypes = {
        todo: PropTypes.object.isRequired
    };
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <article className="todo">
                <input
                    type="checkbox"
                />
                <h3 className="name">{this.props.todo.name}</h3>
                <i className="fa fa-edit"/>
            </article>
        )
    }
}

export default Todo