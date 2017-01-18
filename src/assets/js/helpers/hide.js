const display = className => (shouldBeHidden, elementClasses) => shouldBeHidden ? `${elementClasses} ${className}` : elementClasses;

export const hide = display('hide');

export const invisible = display('invisible');