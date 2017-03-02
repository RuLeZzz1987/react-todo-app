/* eslint-disable prefer-arrow-callback */
import React from "react";
import renderer from "react-test-renderer";
import { Editor } from "../src/assets/js/containers";
import { ErrorStore } from "../src/assets/js/stores";
import { CATEGORY, TODO } from "../src/assets/js/constants";

describe("EditorContainer", function() {
  beforeEach(function() {
    this.width = 270;

    this.render = ({ type, add = jest.fn(), width }) =>
      renderer
        .create(
          <Editor
            type={type}
            placeholder={"Enter category title"}
            add={add}
            width={width}
          />
        )
        .toJSON();
  });

  it(
    "can render minimal editor container with mocked add function with type and width",
    function() {
      expect(this.render({ type: CATEGORY })).toMatchSnapshot();

      expect(this.render({ type: TODO, width: this.width })).toMatchSnapshot();
    }
  );

  it("can render editor container with error not matched type", function() {
    ErrorStore._state = {
      isError: true,
      message: "test message",
      showInPopup: false,
      type: CATEGORY
    };

    expect(this.render({ type: TODO, width: this.width })).toMatchSnapshot();
  });

  it("can render editor container with error shows in popup", function() {
    ErrorStore._state = {
      isError: true,
      message: "test message in popup",
      showInPopup: true,
      type: CATEGORY
    };

    expect(this.render({ type: CATEGORY })).toMatchSnapshot();
  });

  it("can render editor container with error", function() {
    ErrorStore._state = {
      isError: true,
      message: "test message in label",
      showInPopup: false,
      type: CATEGORY
    };

    expect(this.render({ type: CATEGORY })).toMatchSnapshot();
  });
});
