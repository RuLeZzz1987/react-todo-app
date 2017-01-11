import React, { PureComponent, PropTypes } from 'react';
import Checkbox from '../common/CheckBox';
import SearchBox from '../common/SearchBox';
import ProgressBar from '../common/ProgressBar';
import { calcCompletedCount } from '../../helpers/calcCompletedCount';

class Header extends PureComponent {
    
    static propTypes = {
        categories: PropTypes.array
    };
    
    constructor(props) {
        super(props);
    
        const stats = calcCompletedCount(props.categories);
        
        this.state = {
            showOnlyActive: true,
            search: '',
            total: stats.total,
            completed: stats.completed,
        };
        
        this.toggleActive = e => this.setState({showOnlyActive: e.target.checked});
        this.changeSearch = e => this.setState({search: e.target.value});
        this.clearSearch = () => this.setState({search: ''});
    }
    
    componentWillReceiveProps(nextProps) {
        const stats = calcCompletedCount(nextProps.categories);
        this.setState({total: stats.total, completed: stats.completed});
    }
        
    render() {
        return (
            <header style={{height: '13vh'}}>
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
                    total={this.state.total}
                    completed={this.state.completed}
                />
            </header>
        )
    }
}

export default Header