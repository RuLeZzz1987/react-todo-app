import React from 'react';
import renderer from 'react-test-renderer';
import { ModalError } from '../src/assets/js/containers';
import { TODO } from '../src/assets/js/constants';
import { ErrorStore } from '../src/assets/js/stores';

describe('ModalErrorContainer', function () {

  beforeEach(function () {

    ErrorStore._state = ErrorStore.getInitialState();

    this.render = () => renderer.create(
      <ModalError />
    ).toJSON();

  });

  it('can render hidden modal without error', function () {

    expect(this.render()).toMatchSnapshot();

  });

  it('can render shown modal with error message', function () {

    ErrorStore._state = {
      isError: true,
      showInPopup: true,
      message: 'error in popup',
      type: TODO
    };

    expect(this.render()).toMatchSnapshot();

  });

  it('can render hidden modal with error message', function () {

    ErrorStore._state = {
      isError: true,
      showInPopup: false,
      message: 'error in popup',
      type: TODO
    };

    expect(this.render()).toMatchSnapshot();

  });

});