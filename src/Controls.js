import React, { Component } from 'react';
import {
  InputGroup,
  Input
} from 'reactstrap';

class Contols extends Component {
  render() {
    return (
      <InputGroup size="lg">
        <Input placeholder="Filter" />
      </InputGroup>
    );
  }
}

export default Contols;