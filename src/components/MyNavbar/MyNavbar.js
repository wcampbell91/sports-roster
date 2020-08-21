import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import 'firebase/app';

import Auth from '../Auth/Auth';

import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  logoutEvent = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;
    return (
      <div>
        <nav className="navbar navbar-light">
          <a className="navbar-brand" href="#App"><i className="mr-2 fas fa-basketball-ball"></i>Welcome to the home of The Cleveland Cavaliers</a>
          {
            authed
              ? <button className="btn btn-warning" onClick={this.logoutEvent}>Logout<i className="ml-2 fas fa-sign-out-alt"></i></button>
              : <Auth />
          }
        </nav>
      </div>
    );
  }
}

export default MyNavbar;
