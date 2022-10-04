import create from 'zustand'
import Home from '../pages'

interface todoList {
    category: number,
    todoList: string[]
}

export const useTodoStore = create((set) => ({
    categoryList: [
        {
            category: 'Home',
            todoList: []
        }

    ],
    addTodo: (category: number, todoList: string[]) => set((state: { categoryList: [] }) => ({
        categoryList: [...state.categoryList, { category: category, todoList: todoList }]
    })),
    updateTodo: () => set(() => {

    }),
    deleteTodo: () => set(() => {

    }),
}))