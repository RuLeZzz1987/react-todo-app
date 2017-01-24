import Types from '../constants/TodoActionTypes';
import Dispatcher from '../dispatcher';
import uuid from 'uuid';
import { toggleCategoryIfComplete, checkAreComplete } from '../helpers/checkComplete';
import CategoryActions from './CategoryActions';

const Actions = {
  addTodo: ({name, categoryId, id}) => ({
    type: Types.ADD_TODO,
    name,
    categoryId,
    id,
  }),

  removeTodos: ids => ({
    type: Types.REMOVE_TODOS,
    ids
  }),

  toggleTodo: id => ({
    type: Types.TOGGLE_TODO,
    id
  }),

  editTodo: ({name, description, isComplete, id}) => ({
    type: Types.EDIT_TODO,
    name,
    description,
    isComplete,
    id
  }),

  moveTo: ({id, categoryId}) => ({
    type: Types.MOVE_TO,
    id,
    categoryId,
  })
};

const ActionCreators = {

  addTodo(name, categoryId) {
    const id = uuid.v4();

    Dispatcher.dispatch(Actions.addTodo({id, name, categoryId}));

    toggleCategoryIfComplete(categoryId);
  },

  removeTodos(ids) {
    Dispatcher.dispatch(Actions.removeTodos(ids))
  },

  toggleTodo(id) {
    Dispatcher.dispatch(Actions.toggleTodo(id));

    checkAreComplete(id);
  },

  editTodo({id, name, description, isComplete}) {
    Dispatcher.dispatch(Actions.editTodo({id, name, description, isComplete}));

    checkAreComplete(id);
  },

  moveTo({id, targetCategoryId, sourceCategoryId}) {
    Dispatcher.dispatch(Actions.moveTo({id, categoryId: targetCategoryId}));

    CategoryActions.moveTodoToOther({
      todoId: id,
      targetId: targetCategoryId,
      sourceId: sourceCategoryId,
    });

    toggleCategoryIfComplete(targetCategoryId);
    toggleCategoryIfComplete(sourceCategoryId);
  }

};

export default ActionCreators;