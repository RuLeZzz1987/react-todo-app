import { mockId } from '../helpers';
import { CategoryStore, TodoStore } from '../src/assets/js/stores';
import { TodoActions, CategoryActions } from '../src/assets/js/actions';
import mock from '../mock';


describe('TodoActions', function () {

  beforeEach(function () {
    CategoryStore._state = mock.categoryStore;
    TodoStore._state = mock.todoStore;
  });

  it('can add Todo', function () {

    const categoryName = 'Sample_Category_1';
    const categoryId = 'category_id';
    const todoId = 'todo_id';
    const todoName = 'Sample_Todo_1';

    mockId(categoryId);
    CategoryActions.addCategory(categoryName);

    let categories = CategoryStore.getState();

    expect(categories[categoryId].isComplete).toBeTruthy();

    mockId(todoId);
    TodoActions.addTodo(todoName, categoryId);

    categories = CategoryStore.getState();

    expect(categories[categoryId].todos).toContain(todoId);
    expect(categories[categoryId].isComplete).toBeFalsy();

    const todos = TodoStore.getState();
    const todo = todos[todoId];

    expect(todo).toBeDefined();
    expect(todo.categoryId).toBe(categoryId);
    expect(todo.isComplete).toBeFalsy();
    expect(todo.name).toBe(todoName);
    expect(todo.description).toBe('');

  });

  it('can toggle Todo', function () {

    const todosIds = ['5', '2'];
    const affectedCategoriesIds = ['5', '2', '3'];

    TodoActions.toggleTodo(todosIds[0]);
    TodoActions.toggleTodo(todosIds[1]);

    const categories = CategoryStore.getState();
    const todos = TodoStore.getState();

    expect(todos[todosIds[0]].isComplete).toBeTruthy();
    expect(todos[todosIds[1]].isComplete).toBeTruthy();

    expect(categories[affectedCategoriesIds[0]].isComplete).toBeTruthy();
    expect(categories[affectedCategoriesIds[1]].isComplete).toBeTruthy();
    expect(categories[affectedCategoriesIds[2]].isComplete).toBeTruthy();

  });

  it('can edit Todo', function () {

    const name = 'Todo_1_Next_Name';
    const id = '5';
    const description = 'Next Description';
    const isComplete = false;

    TodoActions.editTodo({name, id, description, isComplete});

    const todos = TodoStore.getState();
    const todo = todos[id];

    expect(todo.name).toBe(name);
    expect(todo.description).toBe(description);
    expect(todo.isComplete).toBe(isComplete);

  });

  it('can move Todo to other Category', function () {

    const todoId = '5';
    const sourceCategoryId = '2';
    const targetCategoryId = '5';

    let categories = CategoryStore.getState();

    expect(categories[sourceCategoryId].todos).toContain(todoId);

    TodoActions.moveTo({
      id: todoId,
      sourceCategoryId,
      targetCategoryId
    });

    const todos = TodoStore.getState();
    categories = CategoryStore.getState();

    expect(todos[todoId].categoryId).toBe(targetCategoryId);

    expect(categories[sourceCategoryId].todos).not.toContain(todoId);
    expect(categories[targetCategoryId].todos).toContain(todoId);

  });

});