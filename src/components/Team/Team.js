import React from 'react';
import PropTypes from 'prop-types';
import 'firebase/auth';

import playerData from '../../helpers/data/playerData';
import Player from '../Player/Player';
import PlayerForm from '../PlayerForm/PlayerForm';

import './Team.scss';

class Team extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
  }

  state = {
    players: [],
    formOpen: false,
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

  createPlayer = (newPlayer) => {
    playerData.addPlayer(newPlayer)
      .then((res) => {
        this.getPlayers();
        this.setState({ formOpen: false });
      })
      .catch((err) => console.error('createPlayer Broke!', err));
  }

  editPlayer = (player) => {

  };

  render() {
    const { players, formOpen } = this.state;

    const playerCards = players.map((player) => <Player key={player.id} player={player} deletePlayer={this.deletePlayer} />);

    return (
      <div className="Team">
        <img src="https://1000logos.net/wp-content/uploads/2017/08/CAVS-Logo.png" alt="logo" className="team-logo"/>
        <div>
          <button className="btn btn-primary mb-3" onClick={() => { this.setState({ formOpen: !formOpen }); }}>
            {formOpen ? <i className="far fa-window-close"></i> : <i className="far fa-plus-square"></i>}
          </button>
          {formOpen ? <PlayerForm createPlayer={this.createPlayer} /> : ''}
        </div>
        <div className="card-columns">
          { playerCards }
        </div>
      </div>
    );
  }
}

export default Team;
