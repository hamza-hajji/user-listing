import React, { Component } from 'react';
import Controls from './Controls';
import List from './List';
import {Api} from './api';
import Loading from './Loading';

// helper function
const areFiltersEmpty = (filters) => {
  for (let f in filters) {
    if (filters[f].length) return false;
  }
  return true;
}

class App extends Component {
  state = {
    users: null,
    filters: {
      firstName: '',
      lastName: '',
      country: '',
      email: ''
    }
  }

  applyFilters(users, filters) {
    if (areFiltersEmpty(filters)) return users;

    return users
            .filter(user => filters.firstName.length ? (user.firstName === filters.firstName) : true)
            .filter(user => filters.lastName.length ? (user.lastName === filters.lastName) : true)
            .filter(user => filters.country.length ? (user.coutry === filters.country) : true)
            .filter(user => filters.email.length ? (user.email === filters.email) : true);
  }

  componentDidMount() {
    Api.getUsers().then((users) => {
      this.setState({users});
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2">
            <div className="main-app">
              {/* Only enable the input when state.users is not null */}              
              <Controls
                filters={this.state.filter}
                applyFilters={this.applyFilters.bind(this, this.state.users)}
                disableControls={!Boolean(this.state.users)} />
              <div className="user-list">
                {/* Only show the table when state.users is not null */}
                {
                  Boolean(this.state.users)
                  ? (
                    this.applyFilters(this.state.users, this.state.filters).length
                    ? <List users={this.applyFilters(this.state.users, this.state.filters)} />
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

export default App;
