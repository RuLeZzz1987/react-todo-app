import React from 'react';
import renderer from 'react-test-renderer';
import { Category } from '../src/assets/js/containers';
import * as Stores from '../src/assets/js/stores';

describe('CategoryContainer', function () {

  beforeEach(function () {
    Object.keys(Stores).forEach(key=>{
      Stores[key]._state = Stores[key].getInitialState();
    });

    this.render = ({params={}, id, isTodoFound=false}) => renderer.create(
      <Category
        id={id}
        params={params}
        isTodoFound={isTodoFound}
      />
    ).toJSON();

  });

  it('should return null on category missing', function () {

    expect(this.render('5')).toMatchSnapshot();

  });

});
