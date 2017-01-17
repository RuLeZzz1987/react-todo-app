import { isCategory } from "./isCategory";

/**@function update - recursively update items tree
 * @param {Array} items
 * @param {String} id - target id
 * @param {Function} mapper - mapping function that will be called on the target element
 * @param {Function} hook
 * @param {Object} isUpdated
 * */
export const update =({items, id, mapper, hook, isUpdated = {value: false}}) => {
    if (items.length == 0 || isUpdated.value) return items;
    const either = items.reduce((eitherItems, item)=> {
        if (item.id == id) {
            isUpdated.value = true;
            const mapped = mapper.bind(item, eitherItems);
            call(hook, mapped)
        } else {
            eitherItems.push(isCategory(item, ()=>update({items: item.children, id, mapper, isUpdated, hook})));
        }
        return eitherItems
    }, []);
    return isUpdated.value ? either : items;
};

function call(hook, mapped) {
    return hook instanceof Function ? hook(mapped) : mapped()
}
