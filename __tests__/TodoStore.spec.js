
jest.mock('uuid')
const uuid = require('uuid');

import { TodoStore, CategoryStore } from '../src/assets/js/stores';
import TodoActions from '../src/assets/js/actions/TodoActions';
import CategoryActions from '../src/assets/js/actions/CategoryActions';


const categories = [
  {name: 'Categor_1', id: 0},
  {name: 'Categor_2', id: 1},
  {name: 'Categor_1_1', id: 2, parentId: 0},
  {name: 'Categor_1_1_1', id: 3, parentId: 2},
  {name: 'Category_2_1', id: 4, parentId: 1}
];

const todos = [
  {name: 'Todo_1', categoryId: 1, isComplete: false, id: 0},
  {name: 'Todo_1', categoryId: 2, isComplete: true, id: 1},
  {name: 'Todo_1', categoryId: 3, isComplete: true, id: 2},
  {name: 'Todo_1', categoryId: 4, isComplete: false, id: 3},
  {name: 'Todo_1', categoryId: 4, isComplete: true, id: 4}
]

describe('TodoStore', function(){

  beforeAll(function () {
    categories.forEach(category=>{
      uuid.v4.mockImplementation(()=>category.id);
      CategoryActions.addCategory(category.name, category.parentId);
    });
  });


  it('can add Todo', function () {

    uuid.v4.mockImplementation(()=>todos[0].id);
    TodoActions.addTodo(todos[0].name, todos[0].categoryId);

    const state = TodoStore.getState();

    console.log(TodoStore.getState());

    const todo = state[0];

    expect(Object.keys(state).length).toBe(1);
    expect(todo).toBeDefined();
    expect(todo.categoryId).toBe(todos[0].categoryId);
    expect(todo.isComplete).toBeFalsy();

  })

});