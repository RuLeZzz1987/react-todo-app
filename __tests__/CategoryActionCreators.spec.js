import { mockId } from '../helpers';
import { CategoryActions } from '../src/assets/js/actions';
import { CategoryStore, TodoStore, ErrorStore } from '../src/assets/js/stores';
import mock from '../mock';

describe('CategoryActions', function () {

  beforeEach(function () {
    CategoryStore._state = mock.categoryStore;
    TodoStore._state = mock.todoStore;
    ErrorStore._state = ErrorStore.getInitialState();
  });

  it('set error when category is already exist in the current part of the categories tree', function () {

    const id = '5';
    const category = mock.categoryStore[id];
    const categoryId = 'NEXT_CATEGORY_ID';

    mockId(categoryId);
    CategoryActions.addCategory(category.name);

    const error = ErrorStore.getState();
    const state = CategoryStore.getState();

    expect(error.isError).toBeTruthy();
    expect(error.message.length).not.toBe(0);

    expect(state[categoryId]).toBeUndefined();

  });

  it('can add root category', function () {

    const name = 'Category_NEXT';
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

  it('can add subCategory to already exist one', function () {

    const name = 'Category_1_2_2';
    const id = '11111';
    mockId(id);
    const parentId = '5';

    CategoryActions.addCategory(name, parentId);

    const state = CategoryStore.getState();

    expect(state[id].parentId).toBe(parentId);
    expect(state[parentId].subCategories).toContain(id);

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