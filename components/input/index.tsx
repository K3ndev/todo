import type { NextPage } from 'next'
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


// type safe
interface IFormInputs {
    todoList: string
}
// validation
const schema = yup.object({
    todoList: yup.string().required(),
}).required();

export const Input: NextPage = () => {

    // states 
    const [todoList, setTodoList] = useState<string[]>([])

    // Fn for submit
    const onSubmitHandler = (data: IFormInputs) => {
        setTodoList((prev) => {
            return [...prev, data.todoList]
        })
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
        <form action="#" onSubmit={handleSubmit(onSubmitHandler)} className='w-full fiz'>
            <label htmlFor="todoList">
                <div className=''>
                    <input autoComplete="off" {...register("todoList")} placeholder='Write a new task...' className='' />
                </div>
            </label>
        </form>
    )
}