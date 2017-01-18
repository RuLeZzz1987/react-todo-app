import { ReduceStore } from 'flux/utils';
import TodoActionTypes from '../constants/TodoActionTypes'
import uuid from 'uuid';

class TodoStore extends ReduceStore {

  getInitialState() {
    return {}
  }

  reduce(state, action) {
    switch (action.type) {
      case TodoActionTypes.ADD_TODO:
        return {
          ...state,
          [uuid.v4()]: {
            name: action.name,
            categoryId: action.categoryId,
            isComplete: false,
            description: ''
          }
        };
      case TodoActionTypes.TOGGLE_TODO:
        return {
          ...state,
          [action.id]: {
            ...state[action.id],
            isComplete: !state[action.id].isComplete
          }
        };
      case TodoActionTypes.REMOVE_TODO:
        return removeTodo(state, action.id);
      case TodoActionTypes.EDIT_TODO:
        return {
          ...state,
          [action.id]: {
            ...state[action.id],
            name: action.name,
            description: action.description,
            isComplete: action.isComplete
          },
        };
      case TodoActionTypes.MOVE_TO:
        return {
          ...state,
          [action.id]: {
            ...state[action.id],
            categoryId: action.categoryId,
          },
        };
      default:
        return state;
    }
  }
}

function removeTodo(state, id) {
  return !state[id] ? state
    :
    Object.keys(state)
      .reduce((nextState, currentId) => {
        if (currentId != id) nextState[currentId] = state[currentId];
        return nextState
      }, {})
}


export default TodoStore