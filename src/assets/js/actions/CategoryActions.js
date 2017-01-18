import Dispatcher from '../dispatcher';
import Types from '../constants/CategoryActionTypes';

const Actions = {
  addCategory(name, parentId) {
    Dispatcher.dispatch({
      type: Types.ADD_CATEGORY,
      name,
      parentId
    })
  },

  removeCategory(id) {
    Dispatcher.dispatch({
      type: Types.REMOVE_CATEGORY,
      id
    })
  },

  editCategory(name) {
    Dispatcher.dispatch({
      type: Types.EDIT_CATEGORY,
      name
    })
  },

  toggleCategory(id) {
    Dispatcher.dispatch({
      type: Types.TOGGLE_CATEGORY,
      id
    })
  }
};

export default Actions