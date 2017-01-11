import uuid from 'uuid'

const _id = Symbol('id');
const _name = Symbol('name');
const _createdAt = Symbol('createdAt');
const _updatedAt = Symbol('updatedAt');
const _isComplete = Symbol('isComplete');
const _type = Symbol('type');

export class Entry {
    
    constructor({id, createdAt, type, name, isComplete}) {
        
        this[_name] = name;
        this[_id] = id || uuid.v4();
        this[_createdAt] = createdAt || Date.now();
        this[_updatedAt] = Date.now();
        this[_isComplete] = isComplete;
        this[_type] = type;
    }
    
    
    get name() {
        return this[_name]
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
    
    get isComplete() {
        return this[_isComplete]
    }
    
    get type() {
        return this[_type]
    }
}
