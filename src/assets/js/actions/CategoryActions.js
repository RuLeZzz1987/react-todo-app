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

const ActionCreators = {
  addCategory(name, parentId) {
    Dispatcher.dispatch(Actions.addCategory({name, parentId, id: uuid.v4()}))
  },

  removeCategory(id) {
    const categories = CategoryStore.getState();
    const toBeDeletedCategoriesIds = collectNestedCategoriesIds(categories)(id);
    const toBeDeletedTodosIds = collectNestedTodoIds(categories)(toBeDeletedCategoriesIds);

    TodoActions.removeTodos(toBeDeletedTodosIds);

    Dispatcher.dispatch(Actions.removeCategories(toBeDeletedCategoriesIds));

  },

  editCategory() {
    Dispatcher.dispatch(Actions.editCategory(...arguments));
  },

  toggleCategory(id) {
    Dispatcher.dispatch(Actions.toggleCategory(id))
  },

  moveTodoToOther({todoId, sourceId, targetId}) {
    Dispatcher.dispatch(Actions.moveTo({todoId, sourceId, targetId}))
  }
};

export default ActionCreators