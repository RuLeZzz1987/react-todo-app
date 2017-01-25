export const reduceWithCondition = items => (field, condition) => {
  const ids = Object.keys(items);

  if (ids.length == 0) return items;

  return ids.reduce((result, id)=>items[field] == condition ? {...result, [id]: items[id]} : result, {})
};