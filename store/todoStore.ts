import create from 'zustand'

interface todoList {
    categoryName: string,
    isUsed: boolean,
    todoList: string[]
}

export const useTodoStore = create((set, get) => ({

    // states
    categoryList: [
        {
            categoryName: 'Home',
            isUsed: true,
            todoList: []
        }

    ],

    // computed 



    // functions
    addTodo: (category: string, todoList: string[]) => {
        set((state: { categoryList: [] }) => ({
            categoryList: [...state.categoryList, { categoryName: category, isUsed: false, todoList: todoList }]
        }))
    },
    resetEverything: (newArr: []) => {
        set((state: { categoryList: [] }) => ({
            categoryList: newArr
        }))
    },



}))