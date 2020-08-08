import React from 'react';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>INSIDE APP COMPONENT</h2>
        <button className="btn btn-info"><i class="fas fa-football-ball"></i> Look, a football!</button>
      </div>
    );
  }
}

export default App;
