import React, { Component } from 'react';

export default class Filter extends Component {
  render () {
    const {filter, value} = this.props;

    return (
      <span className="filter-group" data-fg={filter}>
        <span className="filter-name">{filter}</span>&nbsp;
        <span className="filter-value">{value}</span>&nbsp;&nbsp;
        <span onClick={this.props.clearFilter} style={{cursor: 'pointer'}}>x</span>
      </span>
    );
  }
}