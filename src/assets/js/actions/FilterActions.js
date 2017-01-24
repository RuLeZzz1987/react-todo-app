import { FilterActionTypes } from '../constants';
import Dispatcher from "../dispatcher";

const Actions = {
  toggleIsDone: () => ({
    type: FilterActionTypes.TOGGLE_SHOW_DONE
  }),
  changeFilter: filter => ({
    type: FilterActionTypes.CHANGE_FILTER,
    filter
  }),
  clearFilter: () => ({
    type: FilterActionTypes.CLEAR_FILTER
  })
};

const ActionsCreators = {
  toggleIsDone: () => {
    Dispatcher.dispatch(Actions.toggleIsDone())
  },

  changeFilter: filter => {
    Dispatcher.dispatch(Actions.changeFilter(filter))
  },

  clearFilter: () => {
    Dispatcher.dispatch(Actions.clearFilter());
  }
};

export default ActionsCreators;