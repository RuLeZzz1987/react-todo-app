import { FilterActionTypes } from '../constants';
import Dispatcher from "../dispatcher";

const Actions = {
  toggleIsDone: () => ({
    type: FilterActionTypes.TOGGLE_SHOW_DONE
  }),
  changeFilter: filter => ({
    type: FilterActionTypes.CHANGE_FILTER,
    filter
  })
};

const ActionsCreators = {
  toggleIsDone: () => {
    Dispatcher.dispatch(Actions.toggleIsDone())
  },

  changeFilter: filter => {
    Dispatcher.dispatch(Actions.changeFilter(filter))
  }
};

export default ActionsCreators;