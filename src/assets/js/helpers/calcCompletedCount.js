import { CATEGORY } from "../constants";

export const calcCompletedCount = categories => {
  let total = 0;
  let completed = 0;

  calc(categories);

  function calc(elements) {
    elements.forEach(item => {
      if (item.type === CATEGORY) {
        calc(item.children);
      } else {
        total += 1;
        if (item.isComplete) {
          completed += 1;
        }
      }
    });
  }

  return {
    total,
    completed
  };
};
