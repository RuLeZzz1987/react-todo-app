import { TODO } from '../constants';

const mapIsNameExists = (type, name, items) => items.some(item => item.type == type && item.name == name);

export const isNameExists = type => name => (items, item) => type == TODO ? mapIsNameExists(type, name, item.children) : mapIsNameExists(type, name, items);
