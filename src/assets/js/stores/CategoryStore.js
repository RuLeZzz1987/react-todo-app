import { ReduceStore } from "flux/utils";
import CategoryTypes from "../constants/CategoryActionTypes";
import Dispatcher from '../dispatcher';

class CategoryStore extends ReduceStore {

  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return {}
  }

  reduce(state, action) {
    switch (action.type) {
      case CategoryTypes.ADD_CATEGORY:
        return addCategory(state, action);
      case CategoryTypes.REMOVE_CATEGORIES:
        return removeCategories(state, action);
      case CategoryTypes.EDIT_CATEGORY:
        return editCategory(state, action);
      default:
        return state;
    }
  }
}

function addCategory(state, {name, parentId, id}) {
  const nextState = {
    ...state,
    [id]: {
      name,
      parentId,
      subCategories: [],
      todos: []
    }
  };
  if (state[parentId]) {
    nextState[parentId] = {
      ...state[parentId],
      subCategories: state[parentId].subCategories.concat(id)
    }
  }
  return nextState;
}

function removeCategories(state, { ids }) {
  const categoryIds = Object.keys(state);
  if (categoryIds.length == 0 ) return state;

  return categoryIds.reduce((nextState, current)=>{
    if (!ids.includes(current)) nextState[current] = state[current];

    return nextState;
  }, {})
}

function editCategory(state, {name, id}) {
  if (!state[id]) throw new Error(`Missing Category with id: ${id}`);
  return {
    ...state,
    [id]: {
      ...state[id],
      name
    },
  }
}

export default new CategoryStore();