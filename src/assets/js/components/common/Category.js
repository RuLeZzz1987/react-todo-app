import React, {Component, PropTypes} from 'react';

class Category extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        subCategories: PropTypes.array
    };

    render() {
        return (
            <section className="category">
                <i className="fa fa-check"/>
                <h3>{this.props.name}</h3>
                <i className="fa fa-edit"/>
                <div className="remove-add-controls">
                    <i className="fa fa-trash"/>
                    <i className="fa fa-plus"/>
                </div>
            </section>
        )
    }
}

export default Category