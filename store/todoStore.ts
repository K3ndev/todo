import create from 'zustand'

interface todoList {
    categoryName: string,
    isUsed: boolean,
    todoList: string[]
}


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

export const useTodoStore = create((set, get) => ({

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
    addName: (argName: string) => set(() => ({
        name: argName
    })),

    // categoryFn
    addCategory: (argCategory: categoryType) => set((state: any) => ({
        categoryList: [...state.categoryList, argCategory]
    })),
    removeCategory: (argId: number) => set((state: any) => ({
        categoryList: state.categoryList.filter((item: categoryType) => {
            return argId !== item.id
        })
    })),
    changeIsUsed: (argCategory: categoryType) => set((state: any) => ({
        categoryList: state.categoryList.map((item: categoryType) => {
            if (argCategory.categoryName === item.categoryName) {
                return { id: item.id, categoryName: item.categoryName, isUsed: true, todoList: item.todoList }
            }
            return { id: item.id, categoryName: item.categoryName, isUsed: false, todoList: item.todoList }
        })
    })),


    // todoList
    addList: (argIndex: number, argTodoList: todoListType) => set((state: any) => ({
        categoryList: state.categoryList[argIndex].todoList.map((item: todoListType) => {
            if (argTodoList.id !== item.id) {
                state.categoryList[argIndex].todoList.push(argTodoList)
            }
        })
    })),
    removeList: (argIndex: number, argId: number) => set((state: any) => ({
        categoryList: state.categoryList[argIndex].todoList.filter((item: todoListType) => {
            return argId !== item.id
        })
    })),
    updateList: (argIndex: number, argTodoList: todoListType) => set((state: any) => ({
        categoryList: state.categoryList[argIndex].todoList.map((item: todoListType) => {
            if (argTodoList.id === item.id) {
                return argTodoList
            } else item
        })
    }))

}))