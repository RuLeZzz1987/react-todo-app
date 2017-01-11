import { TODO } from '../constants';

const mapIsNameExists = (type, name, items) => {
    return items.some(item => {
        return item.type == type && item.name == name
    });
};

export const isNameExists = type => name => (items, item) => type == TODO ? mapIsNameExists(type, name, item.children) : mapIsNameExists(type, name, items);
