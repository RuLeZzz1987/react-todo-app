import CategoryActions from "../actions/CategoryActions";

export function toggleCategoryIfComplete(id) {
  return function (allTodos) {
    return function (categories) {
      if (!id) return;

      const category = categories[id];
      const {parentId, todos, subCategories, isComplete} = category;

      if (areSubItemsComplete(categories)(allTodos)(subCategories, todos)) {
        return shouldBe(isComplete)(true)(id, parentId);
      }

      return shouldBe(isComplete)(false)(id, parentId);
    }
  }
}

const shouldBe = isComplete => shouldBe => isComplete == shouldBe ?
  (() => {
  }) :
  (id, parentId) => {
    CategoryActions.toggleCategory(id);
    toggleCategoryIfComplete(parentId);
  };


const areItemsComplete = state => ids => ids.every(id => state[id].isComplete);

const areSubItemsComplete = categories => todos => (subCategoriesIds, todosIds) =>
areItemsComplete(categories)(subCategoriesIds) || areItemsComplete(todos)(todosIds);

export function checkAreComplete(todos) {
  return function (todoId) {
    const todo = todos[todoId];
    return toggleCategoryIfComplete(todo.categoryId)(todos);
  }
}