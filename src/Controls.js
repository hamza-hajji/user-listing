import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import {
  InputGroup,
  Input
} from 'reactstrap';

import FiltersDropDown from './DropDown';
import Filter from './Filter';

import { setFilters, clearFilter } from './actions';

class Controls extends Component {
  state = {
    showFilters: false,
    filterNames: [
      'FirstName',
      'LastName',
      'Country',
      'Email',
    ],
    currentInput: '',
    availableFilters: [],
    suggestions: [],
    selectedFilters: [],
    leftPadding: 0
  }

  componentDidMount() {
    this.setState({
      availableFilters: this.state.filterNames,
      suggestions: this.state.filterNames,
    });
  }
  
  selectFilter = (f) => {
    findDOMNode(this.input).value = f + ' ';
    this.handleChange({target: {value: f + ' '}});
    this.onKeyDown({target: {value: f + ' '}});
    findDOMNode(this.input).focus();
  }

  handleChange = (e) => {
    if (e.target.value.split(' ').length % 2 === 0) {
      this.setState({showFilters: false});
    } else {
      this.setState({showFilters: true});
    }
  }
  
  onKeyDown = (e) => {
    const {value} = e.target;

    if (e.ctrlKey && e.keyCode === 8) {
      return this.setState({
        currentInput: '',
        suggestions: this.state.availableFilters
      });
    }

    switch (e.keyCode) {
      case 32:
        e.preventDefault();
        if (value.split(' ').length === 2) {
          this.setState({
            selectedFilters: [
              ...this.state.selectedFilters,
              {
                filter: e.target.value.split(' ')[0],
                value: e.target.value.split(' ')[1],
              }
            ],
            currentInput: ''
          }, () => { // only change the left padding and update available filters when the selected filters are updated
            let width = 0;
            const spans = document.querySelectorAll('.filter-group');
            for (let span of spans) {
              width += span.offsetWidth + 4.8;
            }
            
            this.setState({
              leftPadding: width + 10,
              availableFilters: this.state.availableFilters.filter(f => {
                for (let filter of this.state.selectedFilters) {
                  if (filter.filter === f) return false;
                }
                return true;
              }),
              showFilters: true
            }, () => {
              this.setState({suggestions: this.state.availableFilters});
              this.state.selectedFilters.map(sf => {
                console.log("HERE");
                this.props.setFilters({
                  [sf.filter[0].toLowerCase() + sf.filter.slice(1)]: sf.value
                });
              });
            });
          });
          findDOMNode(this.input).value = '';
          findDOMNode(this.input).focus();
        } else {
          e.preventDefault();
        }
        break;
      case 20:
      case 37:
      case 39:
        e.preventDefault();
        break;
      default:      
        if (
          value.split(' ').length === 1
          && e.keyCode !== 32
          && e.keyCode !== 37
          && e.keyCode !== 38
          && e.keyCode !== 39
          && e.keyCode !== 40
          && e.keyCode !== 9) {
          let currentInput;
          if (e.keyCode !== 8) {
            currentInput = String.fromCharCode(e.keyCode).toLowerCase();
            this.setState({
              currentInput: this.state.currentInput + currentInput
            }, () => {
              console.log(this.state.currentInput);
              this.setState({
                suggestions: this.state.availableFilters.filter(s => {
                  return s.slice(0, this.state.currentInput.length).toLowerCase() === this.state.currentInput;
                })
              });
            });
          } else {
            this.setState({
              currentInput: this.state.currentInput.slice(0, this.state.currentInput.length - 1)
            }, () => {
              this.setState({
                suggestions: this.state.availableFilters.filter(s => {
                  return s.slice(0, this.state.currentInput.length).toLowerCase() === this.state.currentInput;
                })
              });
            });
          }
        }
        break;
    }
  }

  toggle = () => { // not needed, but it's a required prop
    
  }

  clearFilter = (sf) => {
    const {selectedFilters, availableFilters, leftPadding} = this.state;
    const index = selectedFilters.indexOf(sf);
    this.props.clearFilter(sf.filter[0].toLowerCase() + sf.filter.slice(1));

    this.setState({
      selectedFilters: [
        ...selectedFilters.slice(0, index),
        ...selectedFilters.slice(index + 1),
      ]
    }, () => {
      let width = 0;
      const spans = document.querySelectorAll('.filter-group');
      for (let span of spans) {
        width += span.offsetWidth + 4.8;
      }
      this.setState({
        availableFilters: [
          sf.filter,
          ...availableFilters,
        ],
        leftPadding: width + 10
      }, () => {
        this.setState({
          suggestions: this.state.availableFilters,
          currentInput: ''
        });
        findDOMNode(this.input).focus();
      });
    });
  }

  render() {
    return (
      <div className="filter-input">
        <InputGroup size="lg">
          <Input
            style={{paddingLeft: (this.state.leftPadding || 10) + 'px'}}
            ref={node => {this.input = node}}
            onFocus={() => {
              if (findDOMNode(this.input).value.split(' ').length  % 2 !== 0) {
                this.setState({showFilters: true});
              }
            }}
            onBlur={(e) => {
              if (!e.relatedTarget) {
                this.setState({showFilters: false});
              }
            }}
            onChange={this.handleChange}
            onKeyDown={this.onKeyDown}
            disabled={this.props.disableControls}
            spellCheck={false} />
        </InputGroup>
        <FiltersDropDown
          translate={{transform: `translate3d(${this.state.leftPadding}px, 0, 0)`}}
          toggle={this.toggle}
          showFilters={this.state.showFilters}
          selectFilter={this.selectFilter}
          filters={this.state.suggestions} />
        <span
          className="filters">
          {this.state.selectedFilters.map(sf => {
            return (
              <Filter
                clearFilter={() => this.clearFilter(sf)}
                key={sf.filter}
                {...sf} />
            );
          })}
        </span>
      </div>
    );
  }
}

export default connect(null, {setFilters, clearFilter})(Controls);