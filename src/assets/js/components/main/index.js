import React, { PureComponent, PropTypes } from 'react';
import Categories from '../categories';
import Todos from '../todos';


class Main extends PureComponent {

    static propTypes = {
        categories: PropTypes.array.isRequired,
        updateCategories: PropTypes.func.isRequired
    };
    
    render() {
        return (
            <main
                className="main"
            >
                <Categories
                    categories={this.props.categories}
                    updateCategories={this.props.updateCategories}
                />
                <Todos />
            </main>
        )
    }
}

export default Main;