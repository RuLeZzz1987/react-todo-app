import React, { PureComponent, PropTypes } from 'react';
import * as Constants from '../../constants';

class Category extends PureComponent {
    
    static propTypes = {
        category: PropTypes.object.isRequired,
        changeCategoryName: PropTypes.func.isRequired,
        removeCategory: PropTypes.func.isRequired,
        addChild: PropTypes.func.isRequired
    };
    
    constructor(props) {
        super(props);
        
        this.state = {
            isEditMode: false,
            name: props.category.name,
            showFullName: false
        };
        
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.editCategoryName = this.editCategoryName.bind(this);
        this.changeCategoryName = this.changeCategoryName.bind(this, props.category.id);
        this.removeCategory = () => this.props.removeCategory(this.props.category.id);
        this.showFullName = () => this.setState({showFullName: true});
        this.hideFullName = () => this.setState({showFullName: false});
        this.addChild = () => this.props.addChild(this.props.category.id, this.generateChildName(this.props.category.children, 1))
    }
    
    generateChildName(children, n) {
        const nextChildName = `${this.props.category.name}_${n}`;
        return children.some(child=>child.name == nextChildName)
            ?
            this.generateChildName(children, n + 1)
            :
            nextChildName;
    }
    
    toggleEditMode() {
        this.setState({isEditMode: !this.state.isEditMode})
    }
    
    editCategoryName(e) {
        this.setState({name: e.target.value})
    }
    
    changeCategoryName(id) {
        this.toggleEditMode();
        if (this.state.name != this.props.category.name) {
            this.props.changeCategoryName(id, this.state.name)
        }
    }
    
    render() {
        return (
            <section>
                <section
                    onClick={()=> {
                        console.log(this.props.category.id)
                    }}
                    className="category"
                >
                    <i
                        style={{visibility: this.props.category.isComplete ? 'visible' : 'hidden'}}
                        className="fa fa-check"
                    />
                    {this.state.isEditMode ?
                        <input
                            value={this.state.name}
                            onChange={this.editCategoryName}
                            onBlur={this.changeCategoryName}
                            className="category-editor"
                        />
                        :
                        <h3
                            className="displayed-name"
                            onMouseOver={this.showFullName}
                            onMouseOut={this.hideFullName}
                        >
                            {this.props.category.name}
                        </h3>
                    }
                    <i
                        className="fa fa-edit"
                        onClick={this.toggleEditMode}
                    />
                    <div className="remove-add-controls">
                        <i className="fa fa-trash"
                           onClick={this.removeCategory}
                        />
                        <i className="fa fa-plus"
                           onClick={this.addChild}
                        />
                    </div>
                    {this.state.showFullName &&
                    <div className="fullname">
                        {this.props.category.name}
                    </div>}
                </section>
                <section className="category-children">
                    {this.props.category.children
                        .filter(category=>category.type == Constants.CATEGORY)
                        .map(category=><Category
                                key={category.id}
                                addChild={this.props.addChild}
                                category={category}
                                removeCategory={this.props.removeCategory}
                                changeCategoryName={this.props.changeCategoryName}
                            />
                        )}
                </section>
            </section>
        )
    }
}

export default Category