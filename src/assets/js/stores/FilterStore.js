import { ReduceStore } from 'flux/utils';

class TodoStore extends ReduceStore {

  getInitialState() {
    return {
      filter: '',
      showDone: true,
    }
  }

  reduce(state, action) {
    switch(action.type) {
      default:
        return state;
    }
  }
}

export default TodoStore