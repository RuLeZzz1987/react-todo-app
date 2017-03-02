/* eslint-disable prefer-arrow-callback */
import { CategoryStore } from "../src/assets/js/stores";
import mockData from "../mock";
import CategoryActionTypes
  from "../src/assets/js/constants/CategoryActionTypes";
import TodoActionTypes from "../src/assets/js/constants/TodoActionTypes";

jest.mock("uuid");

describe("CategoryStore", function() {
  beforeEach(function() {
    this.state = CategoryStore.getInitialState();

    this.addCategories = () => {
      Object.keys(mockData.categoryStore).forEach(id => {
        this.state[id] = mockData.categoryStore[id];
      });
    };

    this.dispatch = action => {
      this.state = CategoryStore.reduce(this.state, action);
    };
  });

  it(
    "should return unchanged state on not registered action types",
    function() {
      const thatState = this.state;

      this.dispatch({
        type: Symbol("UNREGISTERED_ACTION")
      });

      expect(this.state).toBe(thatState);
    }
  );

  it("can add root Category", function() {
    const name = "Category_1";
    const id = 1;

    this.dispatch({
      type: CategoryActionTypes.ADD_CATEGORY,
      name,
      id
    });

    const category = this.state[id];

    expect(category).toBeDefined();
    expect(category.name).toBe(name);
    expect(category.todos).toEqual([]);
    expect(category.subCategories).toEqual([]);
    expect(category.isComplete).toBeTruthy();
    expect(category.parentId).toBeUndefined();
  });

  it("can add sub Category", function() {
    const rootName = "Category_1";
    const rootId = 1;
    const subName = "Category_1_1";
    const subId = 2;

    this.dispatch({
      type: CategoryActionTypes.ADD_CATEGORY,
      name: rootName,
      id: rootId
    });

    this.dispatch({
      type: CategoryActionTypes.ADD_CATEGORY,
      name: subName,
      id: subId,
      parentId: rootId
    });

    const root = this.state[rootId];
    const sub = this.state[subId];

    expect(root.subCategories).toEqual([subId]);
    expect(sub.parentId).toBe(rootId);
  });

  it("can remove category with sub categories", function() {
    this.addCategories();

    const allIds = Object.keys(mockData.categoryStore);
    const willStay = allIds.slice(0, 2);
    const willBeRemoved = allIds.slice(2, allIds.length);

    this.dispatch({
      type: CategoryActionTypes.REMOVE_CATEGORIES,
      ids: willBeRemoved
    });

    expect(Object.keys(this.state)).toEqual(willStay);
  });

  it("should return unchanged state while trying to remove no ids", function() {
    const thatState = this.state;

    this.dispatch({
      type: CategoryActionTypes.REMOVE_CATEGORIES,
      ids: []
    });

    expect(thatState).toBe(this.state);
  });

  describe("can manipulate with single category", () => {
    beforeEach(function() {
      this.addCategories();

      this.id = "5";

      this.category = mockData.categoryStore[this.id];
    });

    it("can edit category name", function() {
      const nextName = "Category_1_NEXT";

      expect(this.state[this.id].name).toBe(this.category.name);

      this.dispatch({
        type: CategoryActionTypes.EDIT_CATEGORY,
        id: this.id,
        name: nextName
      });
      expect(this.state[this.id].name).toBe(nextName);
    });

    it("can add todo", function() {
      this.dispatch({
        type: TodoActionTypes.ADD_TODO,
        categoryId: this.id,
        id: "1"
      });

      expect(this.state[this.id].todos).toContain("1");
    });

    it("can toggle category", function() {
      const isComplete = this.state[this.id].isComplete;

      this.dispatch({
        type: CategoryActionTypes.TOGGLE_CATEGORY,
        id: this.id
      });

      expect(this.state[this.id].isComplete).toBe(!isComplete);
    });
  });
});
