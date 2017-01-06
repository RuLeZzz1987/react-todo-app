import { Category } from '../models';

export const isCategory = (item, mapper) => item instanceof Category ? item.updateChildren(mapper()) : item;