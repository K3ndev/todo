import type { NextPage } from 'next'
import React, { useState, useMemo, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useTodoStore } from '../../store/todoStore'
import _ from 'lodash';


// type safe
interface IFormInputs {
    todoList: string
}

interface categoryList {
    categoryName: string,
    isUsed: boolean,
    todoList: []
}

// validation
const schema = yup.object({
    todoList: yup.string().required(),
}).required();

export const Input: NextPage = () => {

    // zustand 
    const { categoryList, resetEverything } = useTodoStore<any>((state) => state)

    // states 
    const [tempCategoryList, setTempCategoryList] = useState<any>([])
    const [todoList, setTodoList] = useState<string[]>([])
    // filtered data
    const result = (() => {
        return categoryList.filter((item: categoryList) => {
            return item.isUsed === true
        })
    })()


    // Fn
    //  to get the isUsed that is true, return a data 
    const getIsUsedData = (() => {
        return categoryList.filter((item: categoryList) => item.isUsed)
    })()
    //  to get the isUsed that is true, return an index 
    const getIsUsedIndex = (() => {
        return categoryList.map((item: categoryList) => item.isUsed).indexOf(true)
    })()

    // changing the todoList array 
    const changeTodoList = () => {

    }

    // finding IsUsed === true
    const isTodoList = (input: string) => {
        return todoList.some((item) => {
            return item === input
        })
    }
    // reverse
    const getTodoListReverse = useMemo(() => {
        return todoList.reverse()
    }, [todoList])

    // hook for react form
    const {
        register,
        handleSubmit,
        reset,
    } = useForm<IFormInputs>({
        resolver: yupResolver(schema)
    });

    // Fn for submit
    function onSubmitHandler(data: IFormInputs) {
        if (!isTodoList(data.todoList)) {
            setTodoList((prev) => {
                return [...prev, data.todoList]
            })
        }
        reset()

        tempCategoryList[getIsUsedIndex].todoList = todoList
        resetEverything(tempCategoryList)
        // changing the data in the store
    }

    //
    useEffect(() => {
        let deepClone = _.cloneDeep(categoryList);
        setTempCategoryList(deepClone)

    }, [categoryList])

    // 
    useEffect(() => {
        setTodoList(() => {
            return [...result[0].todoList]
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // console.log(tempCategoryList)
    // console.log(categoryList)
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