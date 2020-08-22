import React from 'react';
import PropTypes from 'prop-types';
import 'firebase/auth';

import playerData from '../../helpers/data/playerData';
import Player from '../Player/Player';

import './Team.scss';

class Team extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
  }

  state = {
    players: [],
  }

  getPlayers = () => {
    playerData.getPlayers()
      .then((response) => this.setState({ players: response }))
      .catch((err) => console.error('get players broke', err));
  };

  componentDidMount() {
    this.getPlayers();
  }

  deletePlayer = (playerId) => {
    playerData.deletePlayer(playerId)
      .then(() => this.getPlayers())
      .catch((err) => console.error('delete player broke!', err));
  };

  editPlayer = (player) => {

  };

  render() {
    const { players } = this.state;

    const playerCards = players.map((player) => <Player key={player.id} player={player} deletePlayer={this.deletePlayer} />);

    return (
      <div className="Team">
        <img src="https://1000logos.net/wp-content/uploads/2017/08/CAVS-Logo.png" alt="logo" className="team-logo"/>
        <div className="card-columns">
          { playerCards }
        </div>
      </div>
    );
  }
}

export default Team;
