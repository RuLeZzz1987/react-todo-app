export const collectNestedCategoriesIds = categories => id =>
  maybeNested(
    categories[id] && categories[id].subCategories,
    categoriesMapper.bind(null, categories)
  ).concat(id);

export const areNested = ids => Array.isArray(ids) && ids.length > 0;

export const collectNestedTodoIds = categories => ids => maybeNested(ids, todosMapper.bind(null, categories));

const maybeNested = (ids, mapper) => areNested(ids) ? mapper(ids) : [];

const categoriesMapper = (state, ids) =>
  ids
    .reduce((nested, current) =>
        nested
          .concat(current)
          .concat(maybeNested(
            state[current] && state[current].subCategories,
            categoriesMapper)
          ),
      []);

const todosMapper = (state, ids) => ids.reduce((collected, current)=>collected.concat(state[current].todos), []);
