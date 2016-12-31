import React, { Component, PropTypes } from 'react';

class Category extends Component {
    
    static propTypes = {
        name: PropTypes.string.isRequired,
        subCategories: PropTypes.array
    };
    
    render() {
        return (
            <section className="category">
                <div className="is-complete"><i className="fa fa-plus"/></div>
                <h3>{this.props.name}</h3>
                <i className="fa fa-edit"/>
                <i className="fa fa-remove"/>
                <i className="fa fa-plus"/>
            </section>
        )
    }
}

export default Category