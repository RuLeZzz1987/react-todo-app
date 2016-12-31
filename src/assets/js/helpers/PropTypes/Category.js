
const validator = (props, propName, componentName) => {
    const category = props[propName];
    if (!category.id || category.id.length == 0) {
        throw new Error(`Invalid prop ${propName} supplied to ${componentName}. Missing ID property. Validation failed.`)
    }
    if (category.subCategoriesList && !(category.subCategoriesList instanceof Array)) {
        throw new Error(`Invalid prop ${propName} supplied to ${componentName}. List property had to been Array but ${typeof category.subCategoriesList} found. Validation failed.`)
    }
    
};