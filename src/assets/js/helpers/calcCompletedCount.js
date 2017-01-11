import { CATEGORY } from '../constants';

export const calcCompletedCount = categories => {
    let total = 0;
    let completed = 0;
    
    calc(categories);
    
    function calc(categories) {
        categories.forEach(item=>{
            if (item.type == CATEGORY) {
                calc(item.children)
            } else {
                total++;
                if (item.isComplete) {
                    completed++;
                }
            }
        })
    }
    
    return {
        total,
        completed
    }
};