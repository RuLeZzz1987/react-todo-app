import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { ModalError } from '../components/common';
import { ErrorStore } from '../stores';
import { ErrorActions } from '../actions';

class ModalErrorContainer extends Component {

  static getStores() {
    return [ErrorStore];
  }

  static calculateState(prevState, props) {
    const error = ErrorStore.getState();

    return {
      error
    }
  }

  render() {
    return (
      <ModalError
        {...this.state}
        {...this.props}
        onClose={ErrorActions.clearError}
      />
    )
  }

}

export default Container.create(ModalErrorContainer, {withProps: true})