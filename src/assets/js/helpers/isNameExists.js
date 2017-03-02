export const isCategoryNameExists = categories => parentId => name => {
  const ids = Object.keys(categories);
  return ids.length === 0
    ? false
    : ids
        .reduce(
          (siblings, id) =>
            categories[id].parentId === parentId
              ? siblings.concat(categories[id])
              : siblings,
          []
        )
        .some(category => category.name === name);
};
