import { CATEGORY } from '../constants';

export const isCategory = (item, mapper) => item.type == CATEGORY ? item.updateChildren(mapper()) : item;