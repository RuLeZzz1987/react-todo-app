import uuid from 'uuid'

const _id = Symbol('id');
const _name = Symbol('name');
const _children = Symbol('children');
const _createdAt = Symbol('createdAt');
const _updatedAt = Symbol('updatedAt');
const _isComplete = Symbol('isComplete');
const _type = Symbol('type');

class Category {

    constructor(name, id, createdAt, children, isComplete) {
        this[_name] = name;
        this[_id] = id || uuid.v4();
        this[_createdAt] = createdAt || Date.now();
        this[_children] = children || [];
        this[_isComplete] = isComplete;
        this[_updatedAt] = Date.now();
        this[_type] = 'category';
    }

    get id(){
        return this[_id]
    }

    get createdAt(){
        return this[_createdAt]
    }

    get updatedAt(){
        return this[_updatedAt]
    }

    get children(){
        return this[_children]
    }

    get name(){
        return this[_name]
    }

    get isComplete(){
        return this[_isComplete]
    }

    get type(){
        return this[_type]
    }

    updateName(value){
        return new Category(
            value,
            this[_id],
            this[_createdAt],
            this[_children]
        )
    }

    toggleIsComplete(){
        return new Category(
            this[_name],
            this[_id],
            this[_createdAt],
            this[_children],
            !this[_isComplete]
        )
    }

    addChild(child) {
        return new Category(
            this[_name],
            this[_id],
            this[_createdAt],
            this[_children].concat(child)
        )
    }

    removeChild(child) {
        return new Category(
            this[_name],
            this[_id],
            this[_createdAt],
            this[_children].filter(own=>own.id != child.id)
        )
    }
}

export default Category;