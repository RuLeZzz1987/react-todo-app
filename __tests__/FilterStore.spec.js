import { FilterStore } from '../src/assets/js/stores';
import { FilterActionTypes } from '../src/assets/js/constants';

describe('FilterStore', function () {

  beforeEach(function () {
    this.state = FilterStore.getInitialState();

    this.dispatch = action => {
      this.state = FilterStore.reduce(this.state, action);
    }
  });

  it('should return unchanged state on not registered action types', function () {

    const thatState = this.state;

    this.dispatch({
      type: Symbol('UNREGISTERED_ACTION')
    });

    expect(this.state).toBe(thatState);

  });

  it('can change and clear filter', function () {

    const nextFilter = 'next filter';

    this.dispatch({
      type: FilterActionTypes.CHANGE_FILTER,
      filter: nextFilter
    });

    expect(this.state.filter).toBe(nextFilter);

    this.dispatch({
      type: FilterActionTypes.CLEAR_FILTER
    });

    expect(this.state.filter).toBe('');

  });

  it('can toggle show done categories & todos filter', function () {
    const currentShowDone = this.state.showDone;

    this.dispatch({
      type: FilterActionTypes.TOGGLE_SHOW_DONE,
    });

    expect(this.state.showDone).toBe(!currentShowDone);

  });

});