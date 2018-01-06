import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class FiltersDropDown extends React.Component {
  renderFilters = () => {
    return this.props.filters.map(f => {
      return (
      <DropdownItem
        tabIndex="0"
        onClick={() => {
          this.props.selectFilter(f);
        }}
        key={f}>
        {f}
      </DropdownItem>
      );
    });
  }

  render() {
    return (
      <div style={this.props.translate}>
        <Dropdown
          className="clearfix"
          isOpen={this.props.showFilters}
          toggle={this.props.toggle}>
          <DropdownToggle className="shrunk">
            Dropdown
          </DropdownToggle>
          <DropdownMenu className="filter-list">
            <DropdownItem disabled>Press Enter to choose filter</DropdownItem>
            {this.renderFilters()}
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}