import CategoryActions from "../actions/CategoryActions";
import { CategoryStore, TodoStore } from '../stores';

export const toggleCategoryIfComplete = id => toggler(id)(TodoStore.getState())(CategoryStore.getState());
export const checkAreComplete = todoId => toggleCategoryIfComplete(getTodo(todoId).categoryId);


const shouldBe = isComplete => shouldBe => isComplete == shouldBe ?
  (() => {
  }) :
  (id, parentId) => {
    CategoryActions.toggleCategory(id);
    toggleCategoryIfComplete(parentId);
  };

const areItemsComplete = state => ids => ids.every(id => state[id].isComplete);

const areSubItemsComplete = categories => todos => (subCategoriesIds, todosIds) =>
  areItemsComplete(categories)(subCategoriesIds) && areItemsComplete(todos)(todosIds);

const getTodo = id => TodoStore.getState()[id];

function toggler(id) {
  return function (allTodos) {
    return function (categories) {
      if (!id) return;

      const category = categories[id];

      if (areSubItemsComplete(categories)(allTodos)(category.subCategories, category.todos)) {
        return shouldBe(category.isComplete)(true)(id, category.parentId);
      }

      return shouldBe(category.isComplete)(false)(id, category.parentId);
    }
  }
}