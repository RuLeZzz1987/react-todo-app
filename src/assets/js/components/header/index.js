import React, { Component } from 'react';
import Checkbox from '../common/CheckBox';
import SearchBox from '../common/SearchBox';
import ProgressBar from '../common/ProgressBar';

class Header extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            showOnlyActive: true,
            search: '',
            percentage: 25
        };
        
        this.toggleActive = e => this.setState({showOnlyActive: e.target.checked});
        this.changeSearch = e => this.setState({search: e.target.value});
        this.clearSearch = () => this.setState({search: ''});
    }
    
    render() {
        return (
            <header>
                <section className="header">
                    <h1 className="project-title">
                        To-Do List
                    </h1>
                    <section className="filter-controls">
                        <Checkbox
                            onChange={this.toggleActive}
                            checked={this.state.showOnlyActive}
                            label={'Show active'}
                        />
                        <SearchBox
                            clear={this.clearSearch}
                            onChange={this.changeSearch}
                            text={this.state.search}
                            placeholder={'Search'}
                        />
                    </section>
                </section>
                <ProgressBar
                    now={this.state.percentage}
                />
            </header>
        )
    }
}

export default Header