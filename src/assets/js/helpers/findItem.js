import { CATEGORY } from '../constants';

export const findItem = type => (categories, id) => {
  let resultItem;

  const find = item => {
    if (item.id == id && item.type == type) {
      resultItem = item;
    }
    if (!resultItem && item.type == CATEGORY) {
      item.children.forEach(find)
    }
  };

  categories.forEach(find);

  return resultItem;
};