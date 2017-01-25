import { ErrorActionTypes } from '../constants';
import Dispatcher from '../dispatcher';

const Actions = {
  setError: message => ({
    type: ErrorActionTypes.SET_ERROR,
    message,
  }),

  clearError: () => ({
    type: ErrorActionTypes.CLEAR_ERROR,
  }),

  setShowInPopup: showInPopup => ({
    type: ErrorActionTypes.SHOW_IN_POPUP,
    showInPopup,
  }),

  setErrorType: errorType => ({
    type: ErrorActionTypes.SET_ERROR_TYPE,
    errorType
  })
};

const ActionCreators = {
  setError: message => {
    Dispatcher.dispatch(Actions.setError(message));
  },

  setShowInPopup: showInPopup => {
    Dispatcher.dispatch(Actions.setShowInPopup(showInPopup));
  },

  setErrorType: type => {
    Dispatcher.dispatch(Actions.setErrorType(type))
  },

  clearError: () => {
    Dispatcher.dispatch(Actions.clearError())
  },
};

export default ActionCreators;