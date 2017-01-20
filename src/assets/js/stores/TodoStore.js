import { ReduceStore } from 'flux/utils';
import TodoActionTypes from '../constants/TodoActionTypes';
import Dispatcher from '../dispatcher';

class TodoStore extends ReduceStore {

  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return {}
  }

  reduce(state, action) {
    switch (action.type) {
      case TodoActionTypes.ADD_TODO:
        return addTodo(state, action);
      case TodoActionTypes.TOGGLE_TODO:
        return toggleTodo(state, action);
      case TodoActionTypes.REMOVE_TODOS:
        return removeTodos(state, action);
      case TodoActionTypes.EDIT_TODO:
        return editTodo(state, action);
      case TodoActionTypes.MOVE_TO:
        return moveTo(state, action);
      default:
        return state;
    }
  }
}

function removeTodos(state, {ids}) {
  const todoIds = Object.keys(state);
  if (todoIds.length == 0 || ids.length == 0) return state;

  return todoIds.reduce((nextState, currentId) => {
    if (!ids.includes(currentId)) nextState[currentId] = state[currentId];
    return nextState
  }, {})
}

function addTodo(state, {categoryId, name, id}) {
  return {
    ...state,
    [id]: {
      name,
      categoryId,
      isComplete: false,
      description: ''
    }
  };
}

function toggleTodo(state, {id}) {
  return {
    ...state,
    [id]: {
      ...state[id],
      isComplete: !state[id].isComplete
    }
  };
}

function editTodo(state, {id, name, description, isComplete}) {
  return {
    ...state,
    [id]: {
      ...state[id],
      name,
      description,
      isComplete,
    },
  };
}

function moveTo(state, {id, categoryId}) {
  return {
    ...state,
    [id]: {
      ...state[id],
      categoryId,
    },
  };
}

export default new TodoStore();