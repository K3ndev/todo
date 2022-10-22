import type { NextPage } from 'next'
import { useMemo } from 'react'
import { useTodoStore } from '../../store/todoStore'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons'

//  form 
// validation
const schema = yup.object({
    todoList: yup.string().required(),
}).required();
type IFormInputs = {
    todoList: string
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

export const TodoList: NextPage = () => {

    // get uniqueID 
    const getUniqueId = () => {
        return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
    }

    // hook for react form
    const {
        register,
        handleSubmit,
        reset,
    } = useForm<IFormInputs>({
        resolver: yupResolver(schema)
    });

    // zustand, global states
    const { categoryList, addList, removeList, changeIsChecked } = useTodoStore<any>((states) => states)

    // return an index, data, and length of the chosen category of the user
    const currentUsed = useMemo(() => {
        const index = categoryList.map((item: categoryType) => item.isUsed).indexOf(true)
        const data = categoryList.filter((item: categoryType) => item.isUsed)

        // reverse, for some reason reverse() is doesn't work in a shallow clone 
        const deepClone = _.cloneDeep(categoryList[index]?.todoList);
        const reverseList = deepClone?.reverse()

        return { index, length: data.length, reverseList }
    }, [categoryList])

    // when the user add/submit a todoList 
    function onSubmitHandler(data: IFormInputs) {
        const checkerList = (() => {
            return currentUsed.reverseList.some((item: todoListType) => {
                return item.list === data.todoList
            })
        })()
        if (!checkerList) {
            addList({ id: getUniqueId(), isChecked: false, list: data.todoList })
        }
        reset()
    }

    // removing a list 
    function removeTodoList(argTodoList: {}) {
        removeList(argTodoList)
    }

    // changing the isChecked to true or false
    function changeChecked(argList: any) {
        changeIsChecked(argList)
    }


    return (
        <div className='w-full gap-4 flex flex-col items-center justify-center'>

            <form action="#" onSubmit={handleSubmit(onSubmitHandler)} className='w-full'>
                <label htmlFor="todoList">
                    <div className='w-full'>
                        <input disabled={!currentUsed.length} autoComplete="off" {...register("todoList")} placeholder='Write a new task...' className='placeholder:font-normal placeholder:text-xs placeholder:md:text-sm placeholder:lg:text-base font-normal text-xs md:text-sm lg:text-base px-6 py-4 w-full h-11 lg:h-16 bg-[#D9D9D9] rounded-2xl outline-0 focus:bg-white' />
                    </div>
                </label>
            </form>

            {/* list */}
            <div className='w-full h-[68vh] scrollbar-hide flex flex-col gap-3'>

                {/*  */}
                {
                    currentUsed.reverseList?.map((item: todoListType) => {
                        return (
                            <div key={getUniqueId()} className='bg-white min-w-full flex items-center rounded-2xl px-6 py-4'>

                                <div className='w-full flex gap-4 items-center h-auto'>
                                    {
                                        !item.isChecked ?
                                            <div onClick={() => { changeChecked(item) }} className='w-[1.25rem] h-[1.25rem] md:w-[1.813rem] md:h-[1.813rem] bg-[#D9D9D9] rounded-lg md:rounded-[0.625rem] cursor-pointer' />
                                            :
                                            <div onClick={() => { changeChecked(item) }} className='w-[1.25rem] h-[1.25rem] md:w-[1.813rem] md:h-[1.813rem] bg-black rounded-lg md:rounded-[0.625rem] cursor-pointer flex justify-center items-center' >
                                                <CheckOutlined className='text-white scale-75 md:scale-100' />
                                            </div>
                                    }
                                    <p className={`${item.isChecked && 'line-through decoration-2'} font-normal text-xs md:text-sm lg:text-base`}>{item.list}</p>
                                </div>
                                <button onClick={() => { removeTodoList(item) }} className='hover:bg-[#EB4747] rounded-full w-7 h-7 flex justify-center items-center cursor-pointer'>
                                    <DeleteOutlined className='text-center' />
                                </button>
                            </div>
                        )
                    })
                }



            </div>
        </div >


    )

}