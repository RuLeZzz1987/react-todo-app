import React, { PureComponent, PropTypes } from "react";
import { Editor } from "../../containers";
import { TODO } from "../../constants";
import TodoItem from "../common/Todo";
import { Todo } from "../../models";
import isAlphaNumeric from "../../helpers/isAlphaNumeric";
import { Exception } from "../../helpers/PropTypes";

class Todos extends PureComponent {

  static propTypes = {
    updateItems: PropTypes.func,
    validateName: PropTypes.func,
    error: Exception,
    clearError: PropTypes.func,
    setError: PropTypes.func,
    showDone: PropTypes.bool,
    category: PropTypes.object,
  };


  render() {
    if (!this.props.category) return (null);

    if (this.props.editor) {
      return React.cloneElement(this.props.editor, {
        category: this.props.category,
        updateTodo: this.updateTodo,
        todo: this.props.category.children.find(item => item.id == this.props.params.todoId)
      })
    }

    return (
      <section>
        <h2 className="category-title">
          {this.props.category && this.props.category.name}
        </h2>
        <section className="editor-area">
          <Editor
            type={TODO}
            placeholder={'Enter TODO title'}
            add={this.add}
           />
        </section>
        <section className="list">
          {this.props.category && this.props.category.children
            .filter(child => child.type == TODO && (this.props.showDone ? true : !child.isComplete))
            .map(todo =>
              <TodoItem
                categoryId={this.props.params.categoryId}
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