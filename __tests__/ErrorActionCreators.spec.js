import { ErrorStore } from '../src/assets/js/stores';
import { ErrorActions } from '../src/assets/js/actions';
import { TODO } from '../src/assets/js/constants';

describe('ErrorActions', function () {

  beforeEach(function () {
    ErrorStore._state = ErrorStore.getInitialState();
  });

  it('can set error with message and clear it after', function () {

    const message = 'error message';

    ErrorActions.setError(message);

    const state = ErrorStore.getState();

    expect(state.isError).toBeTruthy();
    expect(state.message).toBe(message);

  });

  it('can set error type', function () {

    ErrorActions.setErrorType(TODO);

    const state = ErrorStore.getState();

    expect(state.type).toBe(TODO);

  });

  it('can set show error in popup', function () {

    const showInPopup = true;

    let state = ErrorStore.getState();

    expect(state.showInPopup).toBeFalsy();

    ErrorActions.setShowInPopup(showInPopup);

    state = ErrorStore.getState();

    expect(state.showInPopup).toBe(showInPopup);

  });

});