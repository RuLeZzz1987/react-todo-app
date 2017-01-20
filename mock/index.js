export default {
  categories: [
    {name: 'Category_1', id: 5},
    {name: 'Category_2', id: 1},
    {name: 'Category_1_1', id: 2, parentId: 5},
    {name: 'Category_1_1_1', id: 3, parentId: 2},
    {name: 'Category_2_1', id: 4, parentId: 1}
  ],

  todos: [
    {name: 'Todo_5', categoryId: 2, id: 5},
    {name: 'Todo_1', categoryId: 1, id: 1},
    {name: 'Todo_2', categoryId: 3, id: 2},
    {name: 'Todo_3', categoryId: 4, id: 3},
    {name: 'Todo_4', categoryId: 4, id: 4}
  ]
};