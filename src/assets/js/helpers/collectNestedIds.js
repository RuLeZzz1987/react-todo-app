export const collectNestedCategoriesIds = categories => id => {
  return maybeNested(maybeSubCategories(categories[id]), categoriesMapper.bind(null, categories)).concat(id);
};

export const areNested = ids => Array.isArray(ids) && ids.length > 0;
const maybeSubCategories = category => category && category.subCategories || [];

export const collectNestedTodoIds = categories => ids => {
  return maybeNested(ids, todosMapper.bind(null, categories));
};

const maybeNested = (ids, mapper) => areNested(ids) ? mapper(ids, mapper) : [];

const categoriesMapper = (state, ids, mapper) => {
  return ids.reduce((nested, current) => {
    return nested.concat(current).concat(maybeNested(maybeSubCategories(state[current]), mapper))
  }, []);
};


const todosMapper = (state, ids) => ids.reduce((collected, current) => collected.concat(state[current].todos), []);
