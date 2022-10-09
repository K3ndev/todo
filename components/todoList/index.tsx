import type { NextPage } from 'next'
import { useState, useEffect, useMemo } from 'react'
import { useTodoStore } from '../../store/todoStore'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';


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

    // states 
    const [tempList, setTempList] = useState<[]>([])

    // autoanimate
    const [parent] = useAutoAnimate<HTMLDivElement>()

    // zustand 
    const { categoryList, resetEverything } = useTodoStore<any>((states) => states)

    // get uniqueID 
    const getUniqueId = () => {
        return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
    }

    const result = (() => {
        return categoryList.filter((item: categoryList) => {
            return item.isUsed === true
        })
    })()


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
            setTodoList((prev) => {
                return [...prev, data.todoList]
            })
        }
        reset()
    }

    useEffect(() => {
        const deepClone = _.cloneDeep(categoryList);
        deepClone[getIsUsedIndex].todoList = todoList.reverse()
        resetEverything(deepClone)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [todoList])

    // console.log(categoryList)

    return (
        <div className='w-full gap-4 flex flex-col items-center justify-center'>

            <form action="#" onSubmit={handleSubmit(onSubmitHandler)} className='w-full'>
                <label htmlFor="todoList">
                    <div className='w-full'>
                        <input autoComplete="off" {...register("todoList")} placeholder='Write a new task...' className='placeholder:font-normal placeholder:text-xs placeholder:md:text-sm placeholder:lg:text-base font-normal text-xs px-6 py-4 w-full h-11 lg:h-16 bg-[#D9D9D9] rounded-2xl outline-0 focus:bg-white' />
                    </div>
                </label>
            </form>

            {/* list */}
            <div ref={parent} className='w-full h-[75vh] scrollbar-hide flex flex-col gap-3'>

                {/*  */}
                {
                    result[0]?.todoList?.map((item: []) => {
                        return (
                            <div key={getUniqueId()} className='w-full'>
                                <p className='font-normal text-xs md:text-sm lg:text-base px-6 py-4 w-full h-11 lg:h-16 bg-white rounded-2xl outline-0'>{item}</p>
                            </div>
                        )
                    })
                }



            </div>
        </div >
    )
}