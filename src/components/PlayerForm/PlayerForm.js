import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';

class PlayerForm extends React.Component {
  static propTypes = {
    createPlayer: PropTypes.func.isRequired,
    playerToEdit: PropTypes.object.isRequired,
    updatePlayer: PropTypes.func.isRequired,
    closeForm: PropTypes.func.isRequired,
  }

  state = {
    name: '',
    position: '',
    imageUrl: '',
    isEditing: false,
  }

  componentDidUpdate(prevProps) {
    const prevPlayer = prevProps.playerToEdit;
    const incomingPlayer = this.props.playerToEdit;

    if (prevPlayer.name !== incomingPlayer.name) {
      this.setState({
        name: incomingPlayer.name || '',
        position: incomingPlayer.position || '',
        imageUrl: incomingPlayer.imageUrl || '',
        // eslint-disable-next-line no-unneeded-ternary
        isEditing: incomingPlayer.name ? true : false,
      });
    }
  }

  componentDidMount() {
    const { playerToEdit } = this.props;
    if (playerToEdit.name) {
      this.setState({
        name: playerToEdit.name,
        position: playerToEdit.position,
        imageUrl: playerToEdit.imageUrl,
        isEditing: true,
      });
    }
  }

  addNameEvent = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  addPositionEvent = (e) => {
    e.preventDefault();
    this.setState({ position: e.target.value });
  }

  addImageEvent = (e) => {
    e.preventDefault();
    this.setState({ imageUrl: e.target.value });
  }

  addPlayerEvent = (e) => {
    e.preventDefault();
    const { name, position, imageUrl } = this.state;

    const { createPlayer } = this.props;

    const newPlayer = {
      name,
      position,
      imageUrl,
      uid: authData.getUid(),
    };

    createPlayer(newPlayer);
  };

  editPlayerEvent = (e) => {
    e.preventDefault();
    const { name, position, imageUrl } = this.state;
    const { updatePlayer, playerToEdit } = this.props;
    const updatedPlayer = {
      name,
      position,
      imageUrl,
      uid: authData.getUid(),
    };
    console.error(playerToEdit.id);
    updatePlayer(playerToEdit.id, updatedPlayer);
  };

  render() {
    const {
      name,
      position,
      imageUrl,
      isEditing,
    } = this.state;

    const { closeForm } = this.props;
    return (
    <div className="col-6 offset-3 mb-2">
      <form>
        <button className="btn btn-danger mb-2" onClick={closeForm}><i className="fas fa-minus-circle"></i></button>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="player-name"
            placeholder="Enter name"
            value={name}
            onChange={this.addNameEvent}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position</label>
          <input
            type="text"
            className="form-control"
            id="player-position"
            placeholder="Enter position"
            value={position}
            onChange={this.addPositionEvent}
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image Url</label>
          <input
            type="text"
            className="form-control"
            id="player-imageUrl"
            placeholder="Add an image url"
            value={imageUrl}
            onChange={this.addImageEvent}
          />
        </div>
        {
          isEditing
            ? <button className="btn btn-primary" onClick={this.editPlayerEvent}>Update</button>
            : <button type="submit" className="btn btn-primary" onClick={this.addPlayerEvent}>Submit</button>
        }
      </form>
    </div>
    );
  }
}

export default PlayerForm;
