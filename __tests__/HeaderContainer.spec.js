/* eslint-disable prefer-arrow-callback */
import React from "react";
import renderer from "react-test-renderer";
import { Header } from "../src/assets/js/containers";
import { TodoStore } from "../src/assets/js/stores";
import mock from "../mock";

describe("HeaderContainer", function() {
  beforeEach(function() {
    this.render = todoId =>
      renderer.create(<Header todoId={todoId} />).toJSON();
  });

  it("can render header", function() {
    expect(this.render()).toMatchSnapshot();
  });

  it("can render header with todos name", function() {
    TodoStore._state = mock.todoStore;
    const id = "5";

    expect(this.render(id)).toMatchSnapshot();
  });
});
