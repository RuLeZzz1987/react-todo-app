import React, { PureComponent, PropTypes } from 'react';

class Todo extends PureComponent {
    
    static propTypes = {
        todo: PropTypes.object.isRequired,
        toggle: PropTypes.func.isRequired,
    };
    
    constructor(props) {
        super(props);
        
        this.toggle = () => this.props.toggle(this.props.todo.id)
    }
    
    render() {
        return (
            <article className="todo">
                <input
                    onChange={this.toggle}
                    type="checkbox"
                    defaultChecked={this.props.todo.isComplete}
                />
                <h3 className="name">{this.props.todo.name}</h3>
                <i className="fa fa-edit"/>
            </article>
        )
    }
}

export default Todo