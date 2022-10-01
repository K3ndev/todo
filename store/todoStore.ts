import create from 'zustand'

interface todoList {
    category: number,
    todoList: string[]
}

const useBearStore = create((set) => ({
    categoryList: [],
    addTodo: (category: number, todoList: string[]) => set((state: { categoryList: [] }) => ({ categoryList: [...state.categoryList, { category: category, todoList: todoList }] })),
}))