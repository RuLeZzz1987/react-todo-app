import React, {Component, PropTypes} from 'react';

class Category extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        subCategories: PropTypes.array
    };

    constructor(props) {
        super(props);

        this.state = {
            isEditMode: false,
            name: props.name
        };

        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.editCategoryName = this.editCategoryName.bind(this);
    }

    toggleEditMode() {
        this.setState({isEditMode: !this.state.isEditMode})
    }

    editCategoryName(e) {
        this.setState({name: e.target.value})
    }

    render() {
        return (
            <section className="category">
                <i className="fa fa-check"/>
                {this.state.isEditMode ?
                    <input
                        value={this.state.name}
                        onChange={this.editCategoryName}
                        className="category-editor"
                    />
                    :
                    <h3>{this.props.name}</h3>
                }
                <i
                    className="fa fa-edit"
                    onClick={this.toggleEditMode}
                />
                <div className="remove-add-controls">
                    <i className="fa fa-trash"/>
                    <i className="fa fa-plus"/>
                </div>
            </section>
        )
    }
}

export default Category