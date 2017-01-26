import React from 'react';
import renderer from 'react-test-renderer';
import { Categories } from '../src/assets/js/containers';
import * as Stores from '../src/assets/js/stores';
import mock from '../mock';

describe('CategoriesContainer', function () {

  beforeEach(function () {
    Object.keys(Stores).forEach(key=>{
      Stores[key]._state = Stores[key].getInitialState();
    });

    this.render = (params={}) => renderer.create(<Categories params={params}/>).toJSON();

  });

  it('can render empty Categories block', function () {

    expect(this.render()).toMatchSnapshot();

  });

  it('can render Categories block showing only not completed items', function () {

    Stores.FilterStore._state.showDone = false;

    expect(this.render()).toMatchSnapshot();

  });

  it('can render Categories tree', function () {
    Stores.CategoryStore._state = mock.categoryStore;
    Stores.TodoStore._state = mock.todoStore;

    const params = {
      categoryId: '1',
      todoId: '1'
    };

    expect(this.render(params)).toMatchSnapshot();
  });

});