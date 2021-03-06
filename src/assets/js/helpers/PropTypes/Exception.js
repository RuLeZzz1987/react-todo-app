import { PropTypes } from 'react';
import { CATEGORY, TODO } from '../../constants';

export default PropTypes.shape({
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf([CATEGORY, TODO]),
  popup: PropTypes.bool.isRequired,
});