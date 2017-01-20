
jest.mock('uuid');
const uuid = require('uuid');

import { TodoStore, CategoryStore } from '../src/assets/js/stores';
import TodoActions from '../src/assets/js/actions/TodoActions';
import CategoryActions from '../src/assets/js/actions/CategoryActions';
import mockData from '../mock';

describe('TodoStore', function(){

  beforeAll(function () {
    this.state = CategoryStore.getInitialState();

    this.addTodos = () => {
      Object.keys(mockData.todoStore).forEach(id => {
        this.state[id] = mockData.categoryStore[id];
      })
    };

    this.dispatch = action => {
      this.state = CategoryStore.reduce(this.state, action);
    };
  });
  //
  //
  // it('can add Todo', function () {
  //
  //   const { id, name, categoryId } = mockData.todos[0];
  //
  //   checkComplete(CategoryStore.getState(), categoryId, true);
  //
  //   uuid.v4.mockImplementation(()=>id);
  //   TodoActions.addTodo(name, categoryId);
  //
  //   const categoriesState = CategoryStore.getState();
  //
  //   const state = TodoStore.getState();
  //
  //   const todo = state[id];
  //
  //   expect(Object.keys(state).length).toBe(1);
  //   expect(todo).toBeDefined();
  //   expect(todo.categoryId).toBe(categoryId);
  //   expect(todo.isComplete).toBeFalsy();
  //
  //   expect(categoriesState[categoryId].todos).toContain(id);
  //
  //   checkComplete(categoriesState, categoryId, false)
  // });
  //
  // it('can edit Todo', function () {
  //   const { id } = mockData.todos[0];
  //   const nextTodo = {
  //     name: 'Next Todo 1',
  //     description: 'Next Description'
  //   };
  //
  //   TodoActions.editTodo({id, ...nextTodo});
  //
  //   const state = TodoStore.getState();
  //
  //   const todo = state[id];
  //
  //   expect(Object.keys(state).length).toBe(1);
  //   expect(todo).toBeDefined();
  //   expect(todo.name).toBe(nextTodo.name);
  //   expect(todo.description).toBe(nextTodo.description);
  //   expect(todo.isComplete).toBeFalsy();
  //
  // });
  //
  // it('can toggle Todo', function () {
  //   const { categoryId, id } = mockData.todos[0];
  //
  //   checkComplete(CategoryStore.getState(), categoryId, false);
  //
  //   TodoActions.toggleTodo(id);
  //
  //   const state = TodoStore.getState();
  //
  //   expect(state[id]).toBeDefined();
  //   expect(state[id].isComplete).toBeTruthy();
  //
  //   checkComplete(CategoryStore.getState(), categoryId, true);
  //
  // });

  it('can be moved to other Category', function () {
    const { id } = mockData.todos[0];

  })
});

function checkComplete(categories, id, value) {
  expect(categories[id].isComplete).toBe(value);
  if (categories[id].parentId) checkComplete(categories, categories[id].parentId, value);
}

function addWithId(id) {
  uuid.v4.mockImplementation(()=>id);
  return fn => ctx => (name, parentId) => {
    fn.call(ctx, name, parentId)
  }
}