import React, { Component, PropTypes } from 'react';
import { TODO, CATEGORY } from '../../constants';
import { Exception } from '../../helpers/PropTypes';

class Editor extends Component {
    
    static propTypes = {
        add: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        width: PropTypes.number,
        clearError: PropTypes.func.isRequired,
        error: Exception,
        type: PropTypes.oneOf([CATEGORY, TODO]),
    };
    
    constructor(props) {
        super(props);
        
        this.state = {
            name: ''
        };
        
        this.add = () => this.props.add(this.state.name.trim(), undefined, false, this.clearName);
        this.onChange = e => {
            if (this.props.error.isError) {
                this.props.clearError();
            }
            this.setState({name: e.target.value});
        };
        this.clearName = () => this.setState({name: ''})
    }
    
    render() {
        const showError = this.props.error.isError && this.props.error.type == this.props.type && !this.props.error.showInPopup;
        
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
                {showError && <label htmlFor="category">{this.props.error.message}</label>}
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