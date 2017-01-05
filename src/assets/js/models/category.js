import uuid from 'uuid'
import * as Constants from '../constants';

const _id = Symbol('id');
const _name = Symbol('name');
const _children = Symbol('children');
const _createdAt = Symbol('createdAt');
const _updatedAt = Symbol('updatedAt');
const _isComplete = Symbol('isComplete');
const _type = Symbol('type');

export class Category {
    
    constructor({name, id, createdAt, children, isComplete}) {
        this[_name] = name;
        this[_id] = id || uuid.v4();
        this[_createdAt] = createdAt || Date.now();
        this[_children] = children || [];
        this[_isComplete] = isComplete || false;
        this[_updatedAt] = Date.now();
        this[_type] = Constants.CATEGORY;
    }
    
    get id() {
        return this[_id]
    }
    
    get createdAt() {
        return this[_createdAt]
    }
    
    get updatedAt() {
        return this[_updatedAt]
    }
    
    get children() {
        return this[_children]
    }
    
    get name() {
        return this[_name]
    }
    
    get isComplete() {
        return this[_isComplete]
    }
    
    get type() {
        return this[_type]
    }
    
    updateName(name) {
        return name != this[_name] ? new Category({
            name,
            id: this[_id],
            createdAt: this[_createdAt],
            children: this[_children]
        })
            :
            this
    }
    
    toggleIsComplete() {
        return new Category({
            name: this[_name],
            id: this[_id],
            createdAt: this[_createdAt],
            children: this[_children],
            isComplete: !this[_isComplete]
        })
    }
    
    addChild(child) {
        return new Category({
            name: this[_name],
            id: this[_id],
            createdAt: this[_createdAt],
            children: this[_children].concat(child)
        })
    }
    
    updateChildren(children) {
        return children != this[_children] ? new Category({
            name: this[_name],
            id: this[_id],
            createdAt: this[_createdAt],
            children
        })
            :
            this
    }
    
    removeChildren(id) {
        if (!this[_children].any(child=>child == id)) return this;
        
        return new Category({
            name: this[_name],
            id: this[_id],
            createdAt: this[_createdAt],
            children: this[_children].filter(own=>own.id != id)
        })
    }
}

