import React, { Component } from 'react';
import Controls from './Controls';
import List from './List';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2">
            <div className="main-app">
              <Controls />
              <div className="user-list">
                <List />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
