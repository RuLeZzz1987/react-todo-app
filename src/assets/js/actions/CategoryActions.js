import Dispatcher from "../dispatcher";
import { CategoryActionTypes, CATEGORY } from "../constants";
import { collectNestedCategoriesIds, collectNestedTodoIds } from "../helpers";
import { CategoryStore } from "../stores";
import ErrorActions from './ErrorActions';
import TodoActions from './TodoActions';
import uuid from 'uuid';
import { isCategoryNameExists } from '../helpers';

const Actions = {
  addCategory: ({name, parentId, id}) => ({
    type: CategoryActionTypes.ADD_CATEGORY,
    id,
    parentId,
    name
  }),
  removeCategories: ids => ({
    type: CategoryActionTypes.REMOVE_CATEGORIES,
    ids
  }),
  editCategory: (name, id) =>
    ({
      type: CategoryActionTypes.EDIT_CATEGORY,
      name,
      id
    }),
  toggleCategory: id => ({
    type: CategoryActionTypes.TOGGLE_CATEGORY,
    id
  }),
  moveTo: ({todoId, sourceId, targetId}) => ({
    type: CategoryActionTypes.MOVE_TO,
    todoId,
    sourceId,
    targetId,
  })
};

const handleError = type => showInPopup => message => {
  ErrorActions.setErrorType(type);
  ErrorActions.setShowInPopup(showInPopup);
  ErrorActions.setError(message);
};

const ActionCreators = {
  addCategory({name, parentId, showErrorInPopup = false, callback}) {


    if (isCategoryNameExists(CategoryStore.getState())(parentId)(name)) {
      handleError(CATEGORY)(showErrorInPopup)(`Category ${name} is already exist`);
    } else {
      Dispatcher.dispatch(Actions.addCategory({name, parentId, id: uuid.v4()}));
      if (typeof callback == 'function') callback();
    }

  },

  removeCategory(id) {
    const categories = CategoryStore.getState();
    const toBeDeletedCategoriesIds = collectNestedCategoriesIds(categories)(id);
    const toBeDeletedTodosIds = collectNestedTodoIds(categories)(toBeDeletedCategoriesIds);

    TodoActions.removeTodos(toBeDeletedTodosIds);

    Dispatcher.dispatch(Actions.removeCategories(toBeDeletedCategoriesIds));

  },

  editCategory(name, id) {
    Dispatcher.dispatch(Actions.editCategory(name, id));
  },

  toggleCategory(id) {
    Dispatcher.dispatch(Actions.toggleCategory(id))
  },

  moveTodoToOther({todoId, sourceId, targetId}) {
    Dispatcher.dispatch(Actions.moveTo({todoId, sourceId, targetId}))
  }
};

export default ActionCreators