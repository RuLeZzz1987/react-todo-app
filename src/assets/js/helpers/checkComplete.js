import { TodoStore, CategoryStore} from '../stores';
import CategoryActions from '../actions/CategoryActions';

export function toggleCategoryIfComplete(id) {
  if (!id) return;

  let categories = CategoryStore.getState();
  let todos = TodoStore.getState();
  const category = categories[id];

  const areSubItemsComplete = category.todos.every(todoId=>todos[todoId].isComplete) || category.subCategories.every(categoryId=>categories[categoryId].isComplete);
  if (!areSubItemsComplete) {
    return shouldBeToggle(category, toggleCategoryIfComplete, category.isComplete);
  }

  return shouldBeToggle(category, toggleCategoryIfComplete, !category.isComplete)
}

function shouldBeToggle(category, checkParent, shouldBe) {
  if (shouldBe) {
    CategoryActions.toggleCategory(category.id);
    checkParent(category.parentId);
  }
}

export function checkAreComplete(todoId) {
  const todos = TodoStore.getState();
  const todo = todos[todoId];
  return toggleCategoryIfComplete(todo.categoryId);
}