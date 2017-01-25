import React, { Component, PropTypes } from 'react';
import { Container } from 'flux/utils';
import { ErrorStore } from '../stores';
import Editor from '../components/common/Editor';
import { ErrorActions } from '../actions'

class EditorContainer extends Component {

  static getStores() {
    return [ErrorStore]
  }

  static calculateState(prevState, props) {
    const error = ErrorStore.getState();

    return {
      error,
    }
  }

  render() {
    return (
      <Editor
        {...this.props}
        {...this.state}
        clearError={ErrorActions.clearError}
      />
    )
  }
}

export default Container.create(EditorContainer, {withProps: true})