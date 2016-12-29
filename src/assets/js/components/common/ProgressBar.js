import React, { Component, PropTypes } from 'react';

class ProgressBar extends Component {
    
    static propTypes = {
        now: PropTypes.number.isRequired
    };
    
    render() {
        return (
            <div className="progress-bar">
                <div className="inner-bar" style={{width: `${this.props.now}%`}}></div>
            </div>
        )
    }
}

export default ProgressBar