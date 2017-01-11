import React, { PureComponent, PropTypes } from "react";
import Categories from "../categories";
import Todos from "../todos";
import { isCategory } from "../../helpers/isCategory";
import { TODO } from '../../constants';
import { isNameExists } from '../../helpers/isNameExists';
import Modal from '../common/Modal';

class Main extends PureComponent {
    
    static propTypes = {
        categories: PropTypes.array.isRequired,
        updateCategories: PropTypes.func.isRequired
    };
    
    static defaultProps = {
        categories: []
    };
    
    constructor(props) {
        super(props);
        
        this.state = {
            selectedCategory: props.categories.find(category=>category.isRoot),
            isError: false,
            errorType: null,
            errorMessage: '',
            showPopupError: false
        };
        
        this.selectCategory = category => this.setState({selectedCategory: category});
        
        this.addRootCategory = (category, cb) => this.props.updateCategories(this.props.categories.concat(category),
            ()=> {
                this.selectCategory(category);
                cb()
            });
        this.updateItems = (props, cb) => this.props.updateCategories(this.update({
                items: this.props.categories,
                ...props
            }), cb
        );
        
        this.validateName = type => id => name => {
            return this.validate({id, type, name, items: this.props.categories});
        };
        
        this.validate = ({id, type, items, name}) =>
            items.some(item=> {
                if (item.type == TODO) return false;
                return !id || item.id == id ?
                    isNameExists(type)(name)(items, item)
                    : this.validate({id, type, items: item.children, name})
            });
        
        this.clearError = () => this.setState({isError: false, errorMessage: '', showPopupError: false});
        this.setError = type => (msg, showPopup) => this.setState({
            isError: true,
            errorMessage: msg,
            showPopupError: showPopup,
            errorType: type
        });
    }
    
    update({items, id, mapper, isUpdated = {value: false}}) {
        if (items.length == 0 || isUpdated.value) return items;
        const either = items.reduce((eitherItems, item)=> {
            if (item.id == id) {
                isUpdated.value = true;
                this.setState({selectedCategory: mapper.call(item, eitherItems)})
            } else {
                eitherItems.push(isCategory(item, ()=>this.update({items: item.children, id, mapper, isUpdated})));
            }
            return eitherItems
        }, []);
        return isUpdated.value ? either : items;
    }
    
    render() {
        return (
            <main
                className="main"
            >
                <Modal
                    show={this.state.showPopupError}
                    message={this.state.errorMessage}
                    onClose={this.clearError}
                />
                <Categories
                    selectedCategory={this.state.selectedCategory}
                    errorType={this.state.errorType}
                    setError={this.setError}
                    clearError={this.clearError}
                    isError={this.state.isError}
                    showPopupError={this.state.showPopupError}
                    errorMessage={this.state.errorMessage}
                    validateName={this.validateName}
                    addRootCategory={this.addRootCategory}
                    categories={this.props.categories}
                    updateItems={this.updateItems}
                    selectCategory={this.selectCategory}
                />
                <Todos
                    errorType={this.state.errorType}
                    setError={this.setError}
                    clearError={this.clearError}
                    isError={this.state.isError}
                    showPopupError={this.state.showPopupError}
                    errorMessage={this.state.errorMessage}
                    validateName={this.validateName}
                    category={this.state.selectedCategory}
                    updateItems={this.updateItems}
                />
            </main>
        )
    }
}

export default Main;