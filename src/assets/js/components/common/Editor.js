import React, { Component, PropTypes } from 'react';

class Editor extends Component {
    
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
        add: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        width: PropTypes.number
    };
    
    render() {
        return (
            <Container
                width={this.props.width}
            >
                <input
                    type="text"
                    placeholder={this.props.placeholder}
                    onChange={this.onChange}
                />
                <div
                    className="add-button"
                    onClick={this.add}
                >
                    <span className="add-label">
                        ADD
                    </span>
                </div>
            </Container>
        )
    }
}

const Container = ({width, children}) => width ?
    <div className="editor" style={{width: `${width}px`}}>{children}</div>
    :
    <div className="editor">{children}</div>;


export default Editor