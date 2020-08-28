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
    playerToEdit: {},
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

  editPlayer = (playerToEdit) => {
    this.setState({
      playerToEdit,
      formOpen: true,
    });
  };

  updatePlayer = (playerId, updatedPlayer) => {
    playerData.updatePlayer(playerId, updatedPlayer)
      .then((res) => {
        this.getPlayers();
        this.setState({
          playerToEdit: {},
          formOpen: false,
        });
      })
      .catch((err) => console.error(err));
  };

  closeForm = () => {
    this.setState({ formOpen: false });
  }

  render() {
    const { players, formOpen, playerToEdit } = this.state;

    const playerCards = players.map((player) => <Player key={player.id} player={player} deletePlayer={this.deletePlayer} editPlayer={this.editPlayer} />);

    return (
      <div className="Team">
        <img src="https://1000logos.net/wp-content/uploads/2017/08/CAVS-Logo.png" alt="logo" className="team-logo"/>
        <div>
          {!formOpen ? <button className="btn btn-primary mb-3" onClick={() => { this.setState({ formOpen: !formOpen }); }}>Add Player
            {formOpen ? <i className="ml-2 far fa-window-close"></i> : <i className="ml-2 far fa-plus-square"></i>}
          </button> : ''}
          {formOpen ? <PlayerForm createPlayer={this.createPlayer} playerToEdit={playerToEdit} updatePlayer={this.updatePlayer} formOpen={formOpen} closeForm={this.closeForm}/> : ''}
        </div>
        <div className="card-columns">
          { playerCards }
        </div>
      </div>
    );
  }
}

export default Team;
