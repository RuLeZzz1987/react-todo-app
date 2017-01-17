import React, { Component, PropTypes } from "react";
import { Link } from 'react-router';
import Checkbox from '../common/CheckBox';
import { Todo } from '../../models';

class TodoEditor extends Component {

  static propTypes = {
    category: PropTypes.object,
    update: PropTypes.func,
    todo: PropTypes.object,
  };

  static defaultProps = {
    category: {},
    todo: {}
  };

  constructor(props) {
    super(props);

    this.state = {};

    this.toggleComplete = e => this.setState({isComplete: !this.state.isComplete});
    this.change = e => this.setState({[e.target.name]: e.target.value}, ()=>console.log(this.state));

    const updater = () => new Todo({
      name: this.state.name,
      description: this.state.description,
      id: this.props.todo.id,
      isComplete: this.state.isComplete,
      createdAt: this.props.todo.createdAt,
    });

    this.update = () => this.props.update(this.props.todo.id, updater)
  }

  componentWillMount() {
    this.setState({
      description: this.props.todo.description,
      name: this.props.todo.name,
      isComplete: !!this.props.todo.isComplete,
    })
  }

  render() {
    return (
      <section className="todo-editor">
        <section className="control-buttons">
          <Link to={`/${this.props.category.id}`}>
            <button className="save-button" onClick={this.update}>Save changes</button>
          </Link>
          <Link to={`/${this.props.category.id}`}>
            <button className="cancel-button">Cancel</button>
          </Link>
        </section>
        <section className="todo-name">
          <input
            type="text"
            name="name"
            onChange={this.change}
            value={this.state.name}
          />
        </section>
        <section className="is-done">
          <Checkbox
            checked={this.state.isComplete}
            onChange={this.toggleComplete}
            label={'Is Done'}
          />
        </section>
        <section className="description">
          <textarea
            rows="15"
            name="description"
            value={this.state.description}
            onChange={this.change}
          />
        </section>
      </section>
    )
  }
}

export default TodoEditor;