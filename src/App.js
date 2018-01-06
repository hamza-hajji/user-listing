import React, { Component } from 'react';
import { connect } from 'react-redux';

import Controls from './Controls';
import List from './List';
import Loading from './Loading';

import { getUsers } from './actions';

// helper function
const areFiltersEmpty = (filters) => {
  for (let f in filters) {
    if (filters[f].length) return false;
  }
  return true;
}

class App extends Component {
  applyFilters(users, filters) {
    if (areFiltersEmpty(filters)) return users;

    return users
            .filter(user => filters.firstName.length ? (user.firstName.toLowerCase() === filters.firstName.toLowerCase()) : true)
            .filter(user => filters.lastName.length ? (user.lastName.toLowerCase() === filters.lastName.toLowerCase()) : true)
            .filter(user => filters.country.length ? (user.coutry.toLowerCase() === filters.country.toLowerCase()) : true)
            .filter(user => filters.email.length ? (user.email.toLowerCase() === filters.email.toLowerCase()) : true);
  }

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const users = this.applyFilters(this.props.users, this.props.filters);

    return (
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2">
            <div className="main-app">
              {/* Only enable the input when state.users is not null */}              
              <Controls
                filters={this.props.filters}
                disableControls={!Boolean(this.props.users)} />
              <div className="user-list">
                {/* Only show the table when state.users is not null */}
                {
                  Boolean(this.props.users)
                  ? (
                    users.length
                    ? <List users={users} />
                    : <div className="text-center text-info lead">No results for these filters!</div>
                  )
                  : <Loading />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({users, filters}) => ({users, filters});

export default connect(mapStateToProps, {getUsers})(App);
