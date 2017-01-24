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

    expect(categories['2']).toBeUndefined();
    expect(categories['5']).toBeUndefined();
    expect(categories['3']).toBeUndefined();
    expect(categories['1']).toBeDefined();
    expect(categories['4']).toBeDefined();

    expect(todos['2']).toBeUndefined();
    expect(todos['5']).toBeUndefined();
    expect(todos['4']).toBeDefined();
    expect(todos['1']).toBeDefined();
    expect(todos['3']).toBeDefined();

  });

});