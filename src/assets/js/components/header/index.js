import React, { PureComponent, PropTypes } from "react";
import Checkbox from "../common/CheckBox";
import SearchBox from "../common/SearchBox";
import ProgressBar from "../common/ProgressBar";

class Header extends PureComponent {

  static propTypes = {
    completed: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    toggleIsDone: PropTypes.func.isRequired,
    changeFilter: PropTypes.func.isRequired,
    clearFilter: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    showDone: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <header style={{height: '13vh'}}>
        <section className="header">
          <h1 className="project-title">
            To-Do List
          </h1>
          <section className="filter-controls">
            <Checkbox
              onChange={this.props.toggleIsDone}
              checked={this.props.showDone}
              label={'Show done'}
            />
            <SearchBox
              clear={this.props.clearFilter}
              onChange={this.props.changeFilter}
              text={this.props.filter}
              placeholder={'Search'}
            />
          </section>
        </section>
        <ProgressBar
          total={this.props.total}
          completed={this.props.completed}
        />
      </header>
    )
  }
}

export default Header