export default {
  categories: [],

  todoStore: {
    '5': {name: 'Todo_5', categoryId: '2', description: '', isComplete: false},
    '1': {name: 'Todo_1', categoryId: '1', description: '', isComplete: false},
    '2': {name: 'Todo_2', categoryId: '3', description: '', isComplete: false},
    '3': {name: 'Todo_3', categoryId: '4', description: '', isComplete: false},
    '4': {name: 'Todo_4', categoryId: '4', description: '', isComplete: false}
  },
  categoryStore: {
    '5': {name: 'Category_1', parentId: undefined, isComplete: true, todos: [], subCategories: ['2']},
    '1': {name: 'Category_2', parentId: undefined, isComplete: true, todos: ['1'], subCategories: ['4']},
    '2': {name: 'Category_1_1', parentId: '5', isComplete: true, todos: ['5'], subCategories: ['3']},
    '3': {name: 'Category_1_1_1', parentId: '2', isComplete: true, todos: ['2'], subCategories: []},
    '4': {name: 'Category_2_1', parentId: '1', isComplete: true, todos: ['3', '4'], subCategories: []}
  },
};