import React, { Component, PropTypes } from 'react';

class Modal extends Component {

  static propTypes = {
    show: PropTypes.bool.isRequired,
    backdrop: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.close = e => this.props.backdrop && e.target == this.modal ? this.props.onClose() : null;
  }

  render() {
    return (
      <div
        ref={el => {
          this.modal = el
        }}
        className="modal"
        style={{display: this.props.show ? 'block' : 'none'}}
        onClick={this.close}
      >
        <div className="modal-content">
          {React.Children.map(this.props.children, child=>React.cloneElement(child, {onClose: this.close}))}
        </div>
      </div>
    )
  }
}

Modal.Header = ({children, closeButton, onClose}) => (
  <div className="modal-header">
    {closeButton &&
    <span
      className="close"
      onClick={onClose}
    >
      &times;
    </span>}
    {children}
  </div>
);

Modal.Body = ({children}) => (
  <div className="modal-body">
    {children}
  </div>
);

export default Modal;