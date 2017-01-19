import Types from '../constants/TodoActionTypes';
import Dispatcher from '../dispatcher';
import uuid from 'uuid';

const Actions = {

  addTodo(name, categoryId) {
    const id = uuid.v4();

    Dispatcher.dispatch({
      type: Types.ADD_TODO,
      name,
      categoryId,
      id,
    })
  },

  removeTodos(ids) {
    Dispatcher.dispatch({
      type: Types.REMOVE_TODOS,
      ids
    })
  },

  toggleTodo(id) {
    Dispatcher.dispatch({
      type: Types.TOGGLE_TODO,
      id
    })
  },

  editTodo({name, description, isComplete}) {
    Dispatcher.dispatch({
      type: Types.EDIT_TODO,
      name,
      description,
      isComplete
    });
  },

  moveTo(id, categoryId) {
    Dispatcher.dispatch({
      type: Types.MOVE_TO,
      id,
      categoryId
    })
  }

};

export default Actions;