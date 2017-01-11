import { CATEGORY } from "../constants";
import { Entry } from "./entry";

const _children = Symbol('children');
const _isRoot = Symbol('isRoot');
const isComplete = children => children.every(item => item.isComplete);

export class Category extends Entry {
    
    constructor({name, id, createdAt, children, isComplete, isRoot}) {
        super({name, id, createdAt, isComplete, type: CATEGORY});
        
        this[_children] = children || [];
        this[_isRoot] = isRoot || false;
    }
    
    get children() {
        return this[_children]
    }
    
    get isRoot() {
        return this[_isRoot]
    }
    
    updateName(name) {
        if (name == this.name) return this;
        
        return new Category({
            name,
            id: this.id,
            createdAt: this.createdAt,
            children: this.children,
            isComplete: this.isComplete,
            isRoot: this.isRoot
        })
    }
    
    addChild(child) {
        const children = this[_children].concat(child);
        
        return new Category({
            name: this.name,
            id: this.id,
            createdAt: this.createdAt,
            isComplete: isComplete(children),
            children,
            isRoot: this[_isRoot]
        })
    }
    
    updateChildren(children) {
        if (children == this[_children]) return this;
        
        return new Category({
            name: this.name,
            id: this.id,
            createdAt: this.createdAt,
            children,
            isComplete: isComplete(children),
            isRoot: this[_isRoot]
        });
    }
    
}

