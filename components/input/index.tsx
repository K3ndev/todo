import type { NextPage } from 'next'
import React, { useState, useMemo } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useTodoStore } from '../../store/todoStore'


// type safe
interface IFormInputs {
    todoList: string
}
// validation
const schema = yup.object({
    todoList: yup.string().required(),
}).required();

export const Input: NextPage = () => {

    // zustand 
    const { categoryList, addTodo } = useTodoStore<any>((state) => state)
    console.log(categoryList)

    // states 
    const [todoList, setTodoList] = useState<string[]>([])

    // Fn
    const getTodoListReverse = useMemo(() => {
        return todoList.reverse()
    }, [todoList])

    // Fn for submit
    const onSubmitHandler = (data: IFormInputs) => {
        setTodoList((prev) => {
            return [...prev, data.todoList]
        })
        // addTodo(getUniqueId, getTodoListReverse)
        reset()
    }

    // hook for react form
    const {
        register,
        handleSubmit,
        reset,
    } = useForm<IFormInputs>({
        resolver: yupResolver(schema)
    });


    return (
        <form action="#" onSubmit={handleSubmit(onSubmitHandler)} className='w-full'>
            <label htmlFor="todoList">
                <div className='w-full'>
                    <input autoComplete="off" {...register("todoList")} placeholder='Write a new task...' className='placeholder:font-normal placeholder:text-xs placeholder:md:text-sm placeholder:lg:text-base font-normal text-xs px-6 py-4 w-full h-11 lg:h-16 bg-[#D9D9D9] rounded-2xl outline-0 focus:bg-white' />
                </div>
            </label>
        </form>
    )
}