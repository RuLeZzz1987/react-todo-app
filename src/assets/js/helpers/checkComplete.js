import CategoryActions from "../actions/CategoryActions";
import { CategoryStore, TodoStore } from "../stores";

const getTodo = id => TodoStore.getState()[id];

export const toggleCategoryIfComplete = id =>
  toggler(id)(TodoStore.getState())(CategoryStore.getState());

export const checkAreComplete = todoId =>
  toggleCategoryIfComplete(getTodo(todoId).categoryId);

const shouldBe = isComplete => is => isComplete === is
  ? () => {}
  : (id, parentId) => {
      CategoryActions.toggleCategory(id);
      toggleCategoryIfComplete(parentId);
    };

const areItemsComplete = state => ids => ids.every(id => state[id].isComplete);

const areSubItemsComplete = categories =>
  todos =>
    (subCategoriesIds, todosIds) =>
      areItemsComplete(categories)(subCategoriesIds) &&
      areItemsComplete(todos)(todosIds);

function toggler(id) {
  return function(allTodos) {
    return function(categories) {
      if (!id) return;

      const category = categories[id];

      if (
        areSubItemsComplete(categories)(allTodos)(
          category.subCategories,
          category.todos
        )
      ) {
        return shouldBe(category.isComplete)(true)(id, category.parentId);
      }

      return shouldBe(category.isComplete)(false)(id, category.parentId);
    };
  };
}
