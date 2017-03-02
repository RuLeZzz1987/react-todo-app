/* eslint-disable class-methods-use-this */
import { ReduceStore } from "flux/utils";
import CategoryTypes from "../constants/CategoryActionTypes";
import TodoTypes from "../constants/TodoActionTypes";
import Dispatcher from "../dispatcher";

class CategoryStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return {};
  }

  reduce(state, action) {
    switch (action.type) {
      case CategoryTypes.ADD_CATEGORY:
        return addCategory(state, action);
      case CategoryTypes.REMOVE_CATEGORIES:
        return removeCategories(state, action);
      case CategoryTypes.EDIT_CATEGORY:
        return editCategory(state, action);
      case TodoTypes.ADD_TODO:
        return addTodo(state, action);
      case CategoryTypes.TOGGLE_CATEGORY:
        return toggleCategory(state, action);
      case CategoryTypes.MOVE_TO:
        return moveTodoToOther(state, action);
      default:
        return state;
    }
  }
}

function toggleCategory(state, { id }) {
  return {
    ...state,
    [id]: {
      ...state[id],
      isComplete: !state[id].isComplete
    }
  };
}

function addCategory(state, { name, parentId, id }) {
  const nextState = {
    ...state,
    [id]: {
      name,
      parentId,
      isComplete: true,
      subCategories: [],
      todos: []
    }
  };
  if (state[parentId]) {
    nextState[parentId] = {
      ...state[parentId],
      subCategories: state[parentId].subCategories.concat(id)
    };
  }
  return nextState;
}

function addTodo(state, { id, categoryId }) {
  return {
    ...state,
    [categoryId]: {
      ...state[categoryId],
      todos: state[categoryId].todos.concat(id)
    }
  };
}

function removeCategories(state, { ids }) {
  const categoryIds = Object.keys(state);
  if (categoryIds.length === 0) return state;

  return categoryIds.reduce(
    (nextState, current) => {
      // eslint-disable-next-line no-param-reassign
      if (!ids.includes(current)) nextState[current] = state[current];

      return nextState;
    },
    {}
  );
}

function editCategory(state, { name, id }) {
  return {
    ...state,
    [id]: {
      ...state[id],
      name
    }
  };
}

function moveTodoToOther(state, { todoId, targetId, sourceId }) {
  return {
    ...state,
    [targetId]: {
      ...state[targetId],
      todos: state[targetId].todos.concat(todoId)
    },
    [sourceId]: {
      ...state[sourceId],
      todos: state[sourceId].todos.filter(id => id !== todoId)
    }
  };
}

export default new CategoryStore();
