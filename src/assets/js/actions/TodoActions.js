import Types from '../constants/TodoActionTypes';
import Dispatcher from '../dispatcher';
import uuid from 'uuid';
import { toggleCategoryIfComplete, checkAreComplete } from '../helpers/checkComplete';

const Actions = {
  addTodo: ({name, categoryId, id}) => ({
    type: Types.ADD_TODO,
    name,
    categoryId,
    id,
  })
};

const ActionCreators = {

  addTodo(name, categoryId) {
    const id = uuid.v4();

    Dispatcher.dispatch(Actions.addTodo({id, name, categoryId}));

    toggleCategoryIfComplete(categoryId);
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
    });

    checkAreComplete(id);
  },

  editTodo({id, name, description, isComplete}) {
    Dispatcher.dispatch({
      type: Types.EDIT_TODO,
      name,
      description,
      isComplete,
      id
    });

    checkAreComplete(id);
  },

  moveTo({id, nextCategoryId, currentCategoryId}) {
    Dispatcher.dispatch({
      type: Types.MOVE_TO,
      id,
      categoryId: nextCategoryId
    });

    toggleCategoryIfComplete(nextCategoryId);
    toggleCategoryIfComplete(currentCategoryId);
  }

};

export default ActionCreators;