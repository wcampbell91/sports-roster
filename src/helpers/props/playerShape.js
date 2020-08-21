import PropTypes from 'prop-types';

const playerShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { playerShape };
