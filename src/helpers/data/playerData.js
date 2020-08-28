import axios from 'axios';
import apiKeys from '../apiKeys.json';

import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getPlayers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/players.json`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

const addPlayer = (newPlayer) => axios.post(`${baseUrl}/players.json`, newPlayer);

const deletePlayer = (playerId) => axios.delete(`${baseUrl}/players/${playerId}.json`);

const updatePlayer = (playerId, updatedPlayer) => axios.put(`${baseUrl}/players/${playerId}.json`, updatedPlayer);

export default {
  getPlayers,
  deletePlayer,
  updatePlayer,
  addPlayer,
};
