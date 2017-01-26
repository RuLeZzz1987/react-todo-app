import { PropTypes } from 'react';

const { shape, string, arrayOf, bool } = PropTypes;

export default shape({
  name: string.isRequired,
  todos: arrayOf(string).isRequired,
  subCategories: arrayOf(string).isRequired,
  isComplete: bool.isRequired,
})