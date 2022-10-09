import type { NextPage } from 'next'
import { useState, useEffect, useMemo } from 'react'
import { useTodoStore } from '../../store/todoStore'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { AiOutlineDelete } from 'react-icons/ai'


interface categoryList {
    categoryName: string,
    isUsed: boolean,
    todoList: []
}

//  form 
// validation
const schema = yup.object({
    todoList: yup.string().required(),
}).required();

interface IFormInputs {
    todoList: string
}

export const TodoList: NextPage = () => {

    // autoanimate
    const [parent] = useAutoAnimate<HTMLDivElement>()

    // zustand 
    const { categoryList, resetEverything } = useTodoStore<any>((states) => states)

    // get uniqueID 
    const getUniqueId = () => {
        return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
    }


    //  form 
    const [todoList, setTodoList] = useState<string[]>([])

    // hook for react form
    const {
        register,
        handleSubmit,
        reset,
    } = useForm<IFormInputs>({
        resolver: yupResolver(schema)
    });

    // finding IsUsed === true
    const isTodoList = (input: string) => {
        return todoList.some((item) => {
            return item === input
        })
    }
    //  to get the isUsed that is true, return an index 
    const getIsUsedIndex = (() => {
        return categoryList.map((item: categoryList) => item.isUsed).indexOf(true)
    })()

    // Fn for submit
    function onSubmitHandler(data: IFormInputs) {
        if (!isTodoList(data.todoList)) {
            const deepClone = _.cloneDeep(categoryList);
            deepClone[getIsUsedIndex].todoList = [...deepClone[getIsUsedIndex].todoList, { list: data.todoList, isChecked: false }].reverse()

            resetEverything(deepClone)
        }
        reset()
    }
    // Fn for checking the list 
    function changeChecked(listName: string) {
        const deepClone = _.cloneDeep(categoryList);

        // getting the index base on listName
        const getIndex = (listName: string) => {
            return deepClone[getIsUsedIndex].todoList.map((item: any) => {
                return item.list
            }).indexOf(listName)
        }

        deepClone[getIsUsedIndex].todoList[getIndex(listName)].isChecked = !deepClone[getIsUsedIndex].todoList[getIndex(listName)].isChecked
        resetEverything(deepClone)
    }

    return (
        <div className='w-full gap-4 flex flex-col items-center justify-center'>

            <form action="#" onSubmit={handleSubmit(onSubmitHandler)} className='w-full'>
                <label htmlFor="todoList">
                    <div className='w-full'>
                        <input autoComplete="off" {...register("todoList")} placeholder='Write a new task...' className='placeholder:font-normal placeholder:text-xs placeholder:md:text-sm placeholder:lg:text-base font-normal text-xs md:text-sm lg:text-base px-6 py-4 w-full h-11 lg:h-16 bg-[#D9D9D9] rounded-2xl outline-0 focus:bg-white' />
                    </div>
                </label>
            </form>

            {/* list */}
            <div ref={parent} className='w-full h-[75vh] scrollbar-hide flex flex-col gap-3'>

                {/*  */}
                {
                    categoryList[getIsUsedIndex].todoList.reverse().map((item: any) => {
                        return (
                            <div key={getUniqueId()} className='w-full flex justify-between items-center rounded-2xl bg-white h-11 lg:h-16 px-6 py-4'>

                                <div className='w-full flex gap-4 items-center'>
                                    <button onClick={() => { changeChecked(item.list) }} className='w-6 h-6 bg-[#D9D9D9] rounded-lg'></button>
                                    <p className={`${item.isChecked && 'line-through'} font-normal text-xs md:text-sm lg:text-base w-full`}>{item.list}</p>
                                </div>
                                <div className='hover:bg-[#EB4747] rounded-full w-7 h-7 flex justify-center items-center cursor-pointer'>
                                    <AiOutlineDelete />
                                </div>
                            </div>
                        )
                    })
                }



            </div>
        </div >
    )
}