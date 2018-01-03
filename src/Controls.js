import React, { Component } from 'react';
import {
  InputGroup,
  Input
} from 'reactstrap';

class Contols extends Component {
  render() {
    return (
      <InputGroup size="lg">
        <Input placeholder="Filter" disabled={this.props.disableControls} />
      </InputGroup>
    );
  }
}

export default Contols;