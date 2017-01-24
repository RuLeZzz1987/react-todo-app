import { ReduceStore } from 'flux/utils';
import { FilterActionTypes } from '../constants';
import Dispatcher from '../dispatcher';

class FilterStore extends ReduceStore {

  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return {
      filter: '',
      showDone: true,
    }
  }

  reduce(state, action) {
    switch (action.type) {
      case FilterActionTypes.CHANGE_FILTER:
        return {
          ...state,
          filter: action.filter
        };
      case FilterActionTypes.TOGGLE_SHOW_DONE:
        return {
          ...state,
          showDone: !state.showDone
        };
      case FilterActionTypes.CLEAR_FILTER:
        return {
          ...state,
          filter: ''
        };
      default:
        return state;
    }
  }
}

export default new FilterStore();