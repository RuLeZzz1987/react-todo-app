import React, { Component, PropTypes } from 'react';

class ProgressBar extends Component {
    
    static propTypes = {
        total: PropTypes.number.isRequired,
        completed: PropTypes.number.isRequired,
    };
    
    render() {
        return (
            <div className="progress-bar">
                <div className="inner-bar" style={{width: `${this.props.completed / this.props.total * 100}%`}}></div>
            </div>
        )
    }
}

export default ProgressBar