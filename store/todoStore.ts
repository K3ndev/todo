import { boolean } from 'yup'
import create from 'zustand'
import Home from '../pages'

interface todoList {
    category: number,
    todoList: string[]
}

export const useTodoStore = create((set) => ({
    categoryList: [
        {
            categoryName: 'Home UNDER DEVELOPMENT',
            isUsed: true,
            todoList: []
        }

    ],
    currentCategory: '',
    addTodo: (category: string, todoList: string[]) => set((state: { categoryList: [] }) => ({
        categoryList: [...state.categoryList, { categoryName: category, isUsed: false, todoList: todoList }]
    })),
    resetIsUsed: (indexNum: number) => set((state: any) => {
        // state.categoryList[indexNum].isUsed = false
    }),
    deleteTodo: () => set((states: any) => {

    }),

}))