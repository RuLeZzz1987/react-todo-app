import React, { Component, PropTypes } from 'react';

class Modal extends Component {
    
    static propTypes = {
        show: PropTypes.bool.isRequired,
        title: PropTypes.string,
        message: PropTypes.string.isRequired,
        onClose: PropTypes.func.isRequired,
    };
    
    constructor(props) {
        super(props);
        
        this.close = e => e.target == this.modal ? this.props.onClose() : null;
    }
    
    render() {
        return (
            <div
                ref={el=>{this.modal = el}}
                className="modal"
                style={{display: this.props.show ? 'block' : 'none'}}
                onClick={this.close}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <span
                            className="close"
                            onClick={this.props.onClose}
                        >&times;</span>
                        {this.props.title && <h2>{this.props.title}</h2>}
                    </div>
                    <div className="modal-body">
                        <p>{this.props.message}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal