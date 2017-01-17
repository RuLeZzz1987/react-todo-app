import { TODO } from '../constants';
import { Entry } from './entry';

const _description = Symbol('description');


export class Todo extends Entry {
    
    constructor({name, id, createdAt, description, isComplete}) {
        super({name, id, type: TODO, isComplete, createdAt});
        this[_description] = description || '';
    }
    
    get description() {
        return this[_description]
    }
    
    updateName(value) {
        return new Todo({
            name: value,
            id: this[_id],
            createdAt: this.createdAt,
            isComplete: this.isComplete,
            description: this[_description]
        })
    }
    
    updateDescription(value) {
        return new Todo({
            name: this.name,
            id: this.id,
            createdAt: this.createdAt,
            isComplete: this.isComplete,
            description: value
        })
    }
    
    toggleIsComplete() {
        return new Todo({
            name: this.name,
            id: this.id,
            createdAt: this.createdAt,
            isComplete: !this.isComplete,
            description: this[_description]
        })
    }
}
