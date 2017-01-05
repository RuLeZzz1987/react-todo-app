import React, { Component, PropTypes } from 'react';

class Editor extends Component {
    
    static propTypes = {
        add: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        width: PropTypes.number,
        isError: PropTypes.bool.isRequired,
        errorMessage: PropTypes.string.isRequired,
        clearError: PropTypes.func.isRequired
    };
    
    constructor(props) {
        super(props);
        
        this.state = {
            name: ''
        };
        
        this.add = () => this.props.add(this.state.name, this.clearName);
        this.onChange = e => {
            if (this.props.isError) {
                this.props.clearError();
            }
            this.setState({name: e.target.value});
        };
        this.clearName = () => this.setState({name: ''})
    }
    
    render() {
        return (
            <Container
                width={this.props.width}
            >
                <input
                    type="text"
                    name="category"
                    value={this.state.name}
                    placeholder={this.props.placeholder}
                    onChange={this.onChange}
                />
                {this.props.isError && <label htmlFor="category">{this.props.errorMessage}</label>}
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