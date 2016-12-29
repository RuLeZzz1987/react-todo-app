import React, { Component, PropTypes } from 'react';

class Checkbox extends Component {
    
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        label: PropTypes.string,
        checked: PropTypes.bool.isRequired
    };
    
    render() {
        return (
            <div className="show-active-checkbox">
                <input
                    type="checkbox"
                    checked={this.props.checked}
                    onChange={this.props.onChange}
                />
                {this.props.label && <label>{this.props.label}</label>}
            </div>
        )
    }
}

export default Checkbox;