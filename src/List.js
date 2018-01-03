import React, { Component } from 'react';
import { Table } from 'reactstrap';


class List extends Component {
  render () {
    return (
      <Table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Country</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>France</td>
            <td>example@mail.com</td>
          </tr>
          <tr>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>Spain</td>
            <td>example@mail.com</td>
          </tr>
          <tr>
            <td>Larry</td>
            <td>the Bird</td>
            <td>Thailand</td>
            <td>example@mail.com</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default List;