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

  });

  it('can edit Todo', function () {

  });

  it('can move Todo to other Category', function () {

  });

});