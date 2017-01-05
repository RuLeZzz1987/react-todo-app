import uuid from 'uuid'
import * as Constants from '../constants';

const _id = Symbol('id');
const _name = Symbol('name');
const _createdAt = Symbol('createdAt');
const _updatedAt = Symbol('updatedAt');
const _isComplete = Symbol('isComplete');
const _type = Symbol('type');


export class Todo {

    constructor(name, id, createdAt, isComplete) {
        this[_name] = name;
        this[_id] = id || uuid.v4();
        this[_createdAt] = createdAt || Date.now();
        this[_updatedAt] = Date.now();
        this[_isComplete] = isComplete;
        this[_type] = Constants.TODO;
    }

    get name(){
        return this[_name]
    }

    get id(){
        return this[_id]
    }

    get createdAt() {
        return this[_createdAt]
    }

    get updatedAt(){
        return this[_updatedAt]
    }

    get isComplete(){
        return this[_isComplete]
    }

    get type(){
        return this[_type]
    }

    updateName(value) {
        return new Todo(
            value,
            this[_id],
            this[_createdAt],
            this[_isComplete]
        )
    }

    toggleIsComplete() {
        return new Todo(
            this[_name],
            this[_id],
            this[_createdAt],
            !this[_isComplete]
        )
    }
}
