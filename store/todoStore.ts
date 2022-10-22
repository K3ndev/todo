import create from 'zustand'

// types
type todoListType = {
    id: number
    isChecked: boolean,
    list: string
}
type categoryType = {
    id: number,
    categoryName: string
    isUsed: boolean
    todoList: todoListType[]
}

type storeType = {
    categoryList: categoryType[],
    name: string
}

export const useTodoStore = create((set) => ({

    // states
    categoryList: [
        {
            id: 1,
            categoryName: 'Home',
            isUsed: true,
            todoList: []
        }

    ],
    name: '',

    // functions
    resetEverything: (newArr: []) => {
        set((state: { categoryList: [] }) => ({
            categoryList: newArr
        }))
    },


    // refactor...

    // name of the user
    addName: (argName: string) => set(() => ({ name: argName })),

    // categoryFn
    addCategory: (argCategory: categoryType) => set((state: storeType) => ({
        categoryList: [...state.categoryList, argCategory]
    })),
    removeCategory: (argId: number) => set((state: storeType) => ({
        categoryList: state.categoryList.filter((item: categoryType) => argId !== item.id)
    })),
    changeIsUsed: (argCategory: categoryType) => set((state: storeType) => ({
        categoryList: state.categoryList.map((item: categoryType) => {
            if (argCategory.categoryName === item.categoryName) {
                return { id: item.id, categoryName: item.categoryName, isUsed: true, todoList: item.todoList }
            }
            return { id: item.id, categoryName: item.categoryName, isUsed: false, todoList: item.todoList }
        })
    })),


    // todoList
    // adding list in the chosen category
    addList: (argTodoList: todoListType) => set((state: storeType) => ({
        categoryList: state.categoryList.map((item: categoryType) => {
            if (item.isUsed) {
                return { id: item.id, categoryName: item.categoryName, isUsed: true, todoList: [...item.todoList, argTodoList] }
            }
            return item
        })
    })),
    removeList: (argTodoList: todoListType) => set((state: storeType) => ({
        categoryList: state.categoryList.map((item: categoryType) => {
            if (item.isUsed === true) {
                return {
                    id: item.id,
                    categoryName: item.categoryName,
                    isUsed: item.isUsed,
                    todoList: item.todoList.filter((item: todoListType) => {
                        return item.id !== argTodoList.id
                    })
                }
            }
            return item
        })
    })),
    changeIsChecked: (argTodoList: todoListType) => set((state: storeType) => ({
        categoryList: state.categoryList.map((item: categoryType) => {
            if (item.isUsed === true) {
                return {
                    id: item.id,
                    categoryName: item.categoryName,
                    isUsed: item.isUsed,
                    todoList: item.todoList.map((item: todoListType) => {
                        if (item.id === argTodoList.id) {
                            return { id: item.id, isChecked: !item.isChecked, list: item.list }
                        } else return item
                    })
                }
            }
            return item
        })
    })),

}))