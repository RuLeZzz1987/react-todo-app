import { TodoStore } from '../src/assets/js/stores';
import { TodoActionTypes } from '../src/assets/js/constants';
import mockData from '../mock';

describe('TodoStore', function(){

  beforeEach(function () {
    this.state = TodoStore.getInitialState();

    this.addTodos = () => {
      Object.keys(mockData.todoStore).forEach(id => {
        this.state[id] = mockData.todoStore[id];
      })
    };

    this.dispatch = action => {
      this.state = TodoStore.reduce(this.state, action);
    };
  });

  it('should return unchanged state on not registered action types', function () {

    const thatState = this.state;

    this.dispatch({
      type: Symbol('UNREGISTERED_ACTION')
    });

    expect(this.state).toBe(thatState);

  });

  it('can add Todo', function () {

    const name = 'Todo_1';
    const id = '1';
    const categoryId = '1';

    this.dispatch({
      type: TodoActionTypes.ADD_TODO,
      name,
      id,
      categoryId
    });

    const todo = this.state[id];

    expect(todo).toBeDefined();
    expect(todo.name).toBe(name);
    expect(todo.categoryId).toBe(categoryId);
    expect(todo.isComplete).toBeFalsy();
    expect(todo.description).toBe('');

  });


  it('should return the same state if todos were absent', function () {

    const thatState = this.state;

    this.dispatch({
      type: TodoActionTypes.REMOVE_TODOS,
      ids: ['1', '2']
    });

    expect(this.state).toBe(thatState);

  });

  describe('can manipulate todo', function () {

    beforeEach(function () {
      this.addTodos();

      this.id = '1';
      this.todo = mockData.todoStore[this.id];

    });

    it('can remove todos array', function () {
      const ids = Object.keys(mockData.todoStore);
      const willRemoveIds = ids.slice(0, 2);
      const willStayUntouched = ids.slice(2, ids.length);

      this.dispatch({
        type: TodoActionTypes.REMOVE_TODOS,
        ids: willRemoveIds
      });

      expect(Object.keys(this.state)).toEqual(willStayUntouched);

    });

    it('should return the same state if nothing to delete', function () {

      const thatState = this.state;

      this.dispatch({
        type: TodoActionTypes.REMOVE_TODOS,
        ids: []
      });

      expect(this.state).toBe(thatState);

    });

    it('can edit Todo', function () {

      const nextName = 'Todo_1_NEXT';
      const nextDescription = 'NEXT description';
      const nextIsComplete = true;

      this.dispatch({
        type: TodoActionTypes.EDIT_TODO,
        id: this.id,
        name: nextName,
        isComplete: nextIsComplete,
        description: nextDescription
      });

      const todo = this.state[this.id];

      expect(todo.name).toBe(nextName);
      expect(todo.description).toBe(nextDescription);
      expect(todo.isComplete).toBe(nextIsComplete);

    });

    it('can toggle todo', function () {

      const isComplete = this.todo.isComplete;

      this.dispatch({
        type: TodoActionTypes.TOGGLE_TODO,
        id: this.id
      });

      expect(this.state[this.id].isComplete).toBe(!isComplete);

    });

    it('can move todo to other category', function () {
      const nextCategoryId = 'next_category_ID';

      this.dispatch({
        type: TodoActionTypes.MOVE_TO,
        id: this.id,
        categoryId: nextCategoryId
      });

      expect(this.state[this.id].categoryId).toBe(nextCategoryId);
    });

  });

});
