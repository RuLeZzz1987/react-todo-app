import { ReduceStore } from 'flux/utils';
import Dispatcher from '../dispatcher';
import { ErrorActionTypes } from '../constants';

class ErrorStore extends ReduceStore {

  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return {
      message: '',
      type: null,
      showInPopup: false,
      isError: false
    }
  }

  reduce(state, action) {
    switch(action.type) {
      case ErrorActionTypes.SET_ERROR:
        return setError(state, action);
      case ErrorActionTypes.CLEAR_ERROR:
        return this.getInitialState();
      case ErrorActionTypes.SHOW_IN_POPUP:
        return showInPopup(state, action);
      case ErrorActionTypes.SET_ERROR_TYPE:
        return setErrorType(state, action);
      default:
        return state;
    }
  }
}

function setError(state, action) {
  return {
    ...state,
    message: action.message,
    isError: true,
  };
}

function showInPopup(state, action) {
  return {
    ...state,
    showInPopup: action.showInPopup,
  };
}

function setErrorType(state, action) {
  return {
    ...state,
    type: action.errorType
  };
}

export default new ErrorStore();