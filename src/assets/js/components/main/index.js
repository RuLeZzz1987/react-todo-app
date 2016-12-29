import React, { Component } from 'react';
import Categories from '../categories';
import Todos from '../todos';

class Main extends Component {
    
    render() {
        return (
            <main
                className="main"
            >
                <Categories />
                <Todos />
            </main>
        )
    }
}

export default Main;