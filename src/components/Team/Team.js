import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';

import './Team.scss';

class Team extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
  }

  logoutEvent = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    return (
      <div className="Team">
        <h2>Team Component</h2>
      </div>
    );
  }
}

export default Team;
