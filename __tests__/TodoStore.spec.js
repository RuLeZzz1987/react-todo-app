
jest.mock('uuid');
const uuid = require('uuid');

import { TodoStore, CategoryStore } from '../src/assets/js/stores';
import TodoActions from '../src/assets/js/actions/TodoActions';
import CategoryActions from '../src/assets/js/actions/CategoryActions';
import mockData from '../mock';

describe('TodoStore', function(){

  beforeAll(function () {
    mockData.categories.forEach(category=>{
      uuid.v4.mockImplementation(()=>category.id);
      CategoryActions.addCategory(category.name, category.parentId);
    });
  });


  it('can add Todo', function () {

    const { id, name, categoryId } = mockData.todos[0];

    let categoriesState = CategoryStore.getState();

    checkComplete(categoriesState, categoryId, true);

    uuid.v4.mockImplementation(()=>id);
    TodoActions.addTodo(name, categoryId);

    categoriesState = CategoryStore.getState();

    const state = TodoStore.getState();

    const todo = state[id];

    expect(Object.keys(state).length).toBe(1);
    expect(todo).toBeDefined();
    expect(todo.categoryId).toBe(categoryId);
    expect(todo.isComplete).toBeFalsy();

    expect(categoriesState[categoryId].todos).toContain(id);

    function checkComplete(categories, id, value) {
      expect(categories[id].isComplete).toBe(value);
      if (categories[id].parentId) checkComplete(categories, categories[id].parentId, value);
    }

    checkComplete(categoriesState, categoryId, false)
  });

  it('can edit Todo', function () {
    const { id } = mockData.todos[0];
    const nextTodo = {
      name: 'Next Todo 1',
      description: 'Next Description'
    };

    TodoActions.editTodo({id, ...nextTodo});

    const state = TodoStore.getState();

    const todo = state[id];

    expect(Object.keys(state).length).toBe(1);
    expect(todo).toBeDefined();
    expect(todo.name).toBe(nextTodo.name);
    expect(todo.description).toBe(nextTodo.description);
    expect(todo.isComplete).toBeFalsy();

  })

});