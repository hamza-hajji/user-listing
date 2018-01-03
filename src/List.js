import React, { Component } from 'react';
import { Table } from 'reactstrap';


class List extends Component {
  renderTable = () => {
    const {users} = this.props;
    return users.map(user => {
      return (
        <tr key={user.email}>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.coutry}</td>
          <td>{user.email}</td>
        </tr>
      );
    });
  }

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
          {this.renderTable()}
        </tbody>
      </Table>
    );
  }
}

export default List;