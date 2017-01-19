export default {
  categories: [
    {name: 'Category_1', id: 0},
    {name: 'Category_2', id: 1},
    {name: 'Category_1_1', id: 2, parentId: 0},
    {name: 'Category_1_1_1', id: 3, parentId: 2},
    {name: 'Category_2_1', id: 4, parentId: 1}
  ],

  todos: [
    {name: 'Todo_1', categoryId: 1, isComplete: false, id: 0},
    {name: 'Todo_1', categoryId: 2, isComplete: true, id: 1},
    {name: 'Todo_1', categoryId: 3, isComplete: true, id: 2},
    {name: 'Todo_1', categoryId: 4, isComplete: false, id: 3},
    {name: 'Todo_1', categoryId: 4, isComplete: true, id: 4}
  ]
};