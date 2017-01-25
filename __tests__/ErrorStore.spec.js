import { ErrorStore } from '../src/assets/js/stores';
import { ErrorActionTypes, TODO } from '../src/assets/js/constants'

describe('ErrorStore', function () {

  beforeEach(function () {
    this.state = ErrorStore.getInitialState();

    this.dispatch = action => {
      this.state = ErrorStore.reduce(this.state, action);
    }
  });

  it('can set error with message and clear after it', function () {

    const message = 'error message';

    this.dispatch({
      type: ErrorActionTypes.SET_ERROR,
      message
    });

    expect(this.state.message).toBe(message);
    expect(this.state.isError).toBeTruthy();

    this.dispatch({
      type: ErrorActionTypes.CLEAR_ERROR
    });

    expect(this.state).toEqual(ErrorStore.getInitialState())

  });

  it('can set to show error in popup', function () {

    expect(this.state.showInPopup).toBeFalsy();

    this.dispatch({
      type: ErrorActionTypes.SHOW_IN_POPUP,
      showInPopup: true
    });

    expect(this.state.showInPopup).toBeTruthy();

  });

  it('can set error type', function () {

    this.dispatch({
      type: ErrorActionTypes.SET_ERROR_TYPE,
      errorType: TODO
    });

    expect(this.state.type).toBe(TODO);

  });

});