
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

    uuid.v4.mockImplementation(()=>id);
    TodoActions.addTodo(name, categoryId);

    const state = TodoStore.getState();
    const categoriesState = CategoryStore.getState();

    const todo = state[0];

    expect(Object.keys(state).length).toBe(1);
    expect(todo).toBeDefined();
    expect(todo.categoryId).toBe(categoryId);
    expect(todo.isComplete).toBeFalsy();

    expect(categoriesState[categoryId].todos).toContain(id)

  })

});