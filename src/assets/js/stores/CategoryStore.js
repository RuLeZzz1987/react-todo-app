import { ReduceStore } from 'flux/utils';

class CategoryStore extends ReduceStore {

  getInitialState() {
    return {}
  }

  reduce(state, action) {
    switch(action.type) {
      default:
        return state;
    }
  }
}

export default CategoryStore