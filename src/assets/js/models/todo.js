import uuid from 'uuid'
import * as Constants from '../constants';

const _id = Symbol('id');
const _name = Symbol('name');
const _createdAt = Symbol('createdAt');
const _updatedAt = Symbol('updatedAt');
const _isComplete = Symbol('isComplete');
const _type = Symbol('type');
const _description = Symbol('description');


export class Todo {
    
    constructor({name, id, createdAt, description, isComplete}) {
        this[_name] = name;
        this[_id] = id || uuid.v4();
        this[_createdAt] = createdAt || Date.now();
        this[_updatedAt] = Date.now();
        this[_isComplete] = isComplete;
        this[_type] = Constants.TODO;
        this[_description] = description || '';
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
    
    get desticption() {
        return this[_description]
    }
    
    updateName(value) {
        return new Todo({
            name: value,
            id: this[_id],
            createdAt: this[_createdAt],
            isComplete: this[_isComplete],
            description: this[_description]
        })
    }
    
    updateDescription(value) {
        return new Todo({
            name: this[_name],
            id: this[_id],
            createdAt: this[_createdAt],
            isComplete: this[_isComplete],
            description: value
        })
    }
    
    toggleIsComplete() {
        return new Todo({
            name: this[_name],
            id: this[_id],
            createdAt: this[_createdAt],
            isComplete: !this[_isComplete],
            description: this[_description]
        })
    }
}
