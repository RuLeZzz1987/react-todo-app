export const areNested = ids => Array.isArray(ids) && ids.length > 0;

const maybeNested = (ids, mapper) => areNested(ids) ? mapper(ids, mapper) : [];

const maybeSubCategories = category =>
(category && category.subCategories) || [];

const categoriesMapper = (state, ids, mapper) =>
  ids.reduce(
    (nested, current) =>
      nested
        .concat(current)
        .concat(maybeNested(maybeSubCategories(state[current]), mapper)),
    []
  );

export const collectNestedCategoriesIds = categories =>
  id =>
    maybeNested(
      maybeSubCategories(categories[id]),
      categoriesMapper.bind(null, categories)
    ).concat(id);

const todosMapper = (state, ids) =>
  ids.reduce((collected, current) => collected.concat(state[current].todos), [
  ]);

export const collectNestedTodoIds = categories =>
  ids => maybeNested(ids, todosMapper.bind(null, categories));
