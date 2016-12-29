import React, { Component, PropTypes } from 'react';

class SearchBox extends Component {
    
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        text: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        clear: PropTypes.func.isRequired
    };
    
    render() {
        return (
            <div className="search-box">
                <input
                    type="text"
                    value={this.props.text}
                    onChange={this.props.onChange}
                    placeholder={this.props.placeholder || ''}
                />
                <span
                    onClick={this.props.clear}
                    className="clear-button"
                >
                    <span className="cross">X</span>
                </span>
            </div>
        )
    }
}

export default SearchBox;