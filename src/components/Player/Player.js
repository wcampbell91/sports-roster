import React from 'react';
import PropTypes from 'prop-types';

import playerShape from '../../helpers/props/playerShape';

import './Player.scss';
// import playerData from '../../helpers/data/playerData';

class Player extends React.Component {
  static propTypes = {
    player: playerShape.playerShape,
    deletePlayer: PropTypes.func.isRequired,
  }

  ejectPlayerEvent = (e) => {
    e.preventDefault();
    const { player, deletePlayer } = this.props;

    deletePlayer(player.id);
  };

  render() {
    const { player } = this.props;
    return (
      <div className="card player-card mr-0">
        <img src={ player.imageUrl } className="card-img-top" alt="..."></img>
        <div className="card-body">
          <h5 className="card-title">{ player.name }</h5>
          <p className="card-text">{ player.position }</p>
          <button className="btn btn-danger" onClick={this.ejectPlayerEvent}>Eject Player</button>
        </div>
      </div>
    );
  }
}

export default Player;
