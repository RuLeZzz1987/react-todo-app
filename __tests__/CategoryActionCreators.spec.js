import { CategoryActions } from '../src/assets/js/actions';

import mock from '../mock';

jest.mock('uuid');

import uuid from 'uuid';
const CategoryStore = require('../src/assets/js/stores').CategoryStore;
const TodoStore = require('../src/assets/js/stores').TodoStore;

const mockId = id => uuid.v4.mockImplementation(() => id);

describe('CategoryActions', function () {

  beforeEach(function () {
    CategoryStore._state = mock.categoryStore;
    TodoStore._state = mock.todoStore;
  });

  it('can add root category', function () {

    const name = 'Category_1';
    const id = '11111';
    mockId(id);

    CategoryActions.addCategory(name);

    const state = CategoryStore.getState();
    const category = state[id];

    expect(category).toBeDefined();
    expect(category.name).toBe(name);
    expect(category.parentId).toBeUndefined();
    expect(category.subCategories).toEqual([]);
    expect(category.todos).toEqual([]);

  });

  it('can remove category with subcategories', function () {

    CategoryActions.removeCategory('5');

    const categories = CategoryStore.getState();
    const todos = TodoStore.getState();

    expect(Object.keys(todos)).toEqual(['1', '3', '4']);
    expect(Object.keys(categories)).toEqual(['1', '4'])

  });

  it('can edit category name', function () {

    const nextName = 'Category_1_NEXT';
    const id = '5';

    CategoryActions.editCategory(nextName, id);

    const categories = CategoryStore.getState();
    const category = categories[id];

    expect(category.name).toBe(nextName);

  });

  it('can toggle category isComplete', function () {
    const id = '4';

    let categories = CategoryStore.getState();

    expect(categories[id].isComplete).toBeFalsy();

    CategoryActions.toggleCategory(id);

    categories = CategoryStore.getState();

    expect(categories[id].isComplete).toBeTruthy();

  })

});