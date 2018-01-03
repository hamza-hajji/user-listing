import React, { Component } from 'react';
import Controls from './Controls';
import List from './List';
import {Api} from './api';

class App extends Component {
  state = {
    users: null
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
              <Controls />
              <div className="user-list">
                {/* Only show the table when state.users is not null */}
                { 
                  this.state.users
                  && <List {...this.state} />
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
