import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';

class PlayerForm extends React.Component {
  static propTypes = {
    createPlayer: PropTypes.func.isRequired,
  }

  state = {
    name: '',
    position: '',
    imageUrl: '',
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

  render() {
    return (
    <div className="col-6 offset-3 mb-2">
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="player-name"
            placeholder="Enter name"
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
            onChange={this.addImageEvent}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={this.addPlayerEvent}>Submit</button>
      </form>
    </div>
    );
  }
}

export default PlayerForm;
