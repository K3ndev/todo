import { boolean } from 'yup'
import create from 'zustand'
import Home from '../pages'

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
            todoList: ['nani', 'test']
        }

    ],
    currentCategory: '',


    // computed 



    // functions
    addTodo: (category: string, todoList: string[]) => {
        set((state: { categoryList: [] }) => ({
            categoryList: [...state.categoryList, { categoryName: category, isUsed: false, todoList: todoList }]
        }))
    },
    addList: (index: number) => set((state: []) => ({

    })),
    resetEverything: (newArr: []) => {
        set((state: { categoryList: [] }) => ({
            categoryList: newArr
        }))
    },



}))