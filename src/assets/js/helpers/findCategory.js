import { CATEGORY } from '../constants';

export const findCategory = (categories, id) => {
  let category;

  const find = item => {
    if (item.id == id) {
      category = item;
    }
    if (!category && item.type == CATEGORY) {
      item.children.forEach(find)
    }
  };

  categories.forEach(find);

  return category;
};