import Dispatcher from "../dispatcher";
import CategoryActionTypes from "../constants/CategoryActionTypes";
import { collectNestedCategoriesIds, collectNestedTodoIds } from "../helpers";
import { CategoryStore } from "../stores";
import TodoActions from './TodoActions';
import uuid from 'uuid';

const Actions = {
  addCategory: ({name, parentId, id}) => ({
    type: CategoryActionTypes.ADD_CATEGORY,
    id,
    parentId,
    name
  })
};

const ActionCreators = {
  addCategory(name, parentId) {
    Dispatcher.dispatch(Actions.addCategory({name, parentId, id: uuid.v4()}))
  },

  removeCategory(id) {
    const categories = CategoryStore.getState();
    const toBeDeletedCategoriesIds = collectNestedCategoriesIds(categories)(id);
    const toBeDeletedTodosIds = collectNestedTodoIds(categories)(toBeDeletedCategoriesIds);

    TodoActions.removeTodos(toBeDeletedTodosIds);

    Dispatcher.dispatch({
      type: CategoryActionTypes.REMOVE_CATEGORIES,
      ids: toBeDeletedCategoriesIds
    });

  },

  editCategory(name, id) {
    Dispatcher.dispatch({
      type: CategoryActionTypes.EDIT_CATEGORY,
      name,
      id
    })
  },

  toggleCategory(id) {
    Dispatcher.dispatch({
      type: CategoryActionTypes.TOGGLE_CATEGORY,
      id
    })
  }
};

export default ActionCreators