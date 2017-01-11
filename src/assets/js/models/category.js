import { CATEGORY } from "../constants";
import { Entry } from "./entry";

const _children = Symbol('children');
const _isRoot = Symbol('isRoot');
const isComplete = children => children ? children.every(item => item.isComplete) : true;

export class Category extends Entry {
    
    constructor({name, id, createdAt, children, isRoot}) {
        super({name, id, createdAt, isComplete: isComplete(children), type: CATEGORY});
        
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
            isRoot: this.isRoot
        })
    }
    
    addChild(child) {
        const children = this[_children].concat(child);
        
        return new Category({
            name: this.name,
            id: this.id,
            createdAt: this.createdAt,
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
            isRoot: this[_isRoot]
        });
    }
    
}

