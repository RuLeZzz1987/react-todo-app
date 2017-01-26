import React, { Component, PropTypes } from 'react';
import Modal from './Modal';
import { Exception } from '../../helpers/PropTypes';

class ModalError extends Component {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    error: Exception,
  };

  render() {
      return (
        <Modal
          backdrop
          onClose={this.props.onClose}
          show={!!this.props.error.showInPopup}
        >
          <Modal.Header
            closeButton
          >
            <h2>Something goes wrong!</h2>
          </Modal.Header>
          <Modal.Body>
            <p>{this.props.error.message}</p>
          </Modal.Body>
        </Modal>
      )
  }
}

export default ModalError