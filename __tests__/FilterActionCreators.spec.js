import { FilterStore } from '../src/assets/js/stores';
import { FilterActions } from '../src/assets/js/actions';

describe('FilterActions', function () {

  it('can toggle show done', function () {

    let state = FilterStore.getState();

    const { showDone } = state;

    FilterActions.toggleIsDone();

    state = FilterStore.getState();

    expect(state.showDone).toBe(!showDone);

  });

  it('can change and clear filter', function () {

    const nextFilter = 'next_filter';

    FilterActions.changeFilter(nextFilter);

    let state = FilterStore.getState();

    expect(state.filter).toBe(nextFilter);

    FilterActions.clearFilter();

    state = FilterStore.getState();

    expect(state.filter).toBe('');

  });

});