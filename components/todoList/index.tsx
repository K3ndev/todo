import type { NextPage } from 'next'
import { useState, useEffect, useMemo } from 'react'
import { useTodoStore } from '../../store/todoStore'
// import { useAutoAnimate } from '@formkit/auto-animate/react'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons'
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

    //! refactor this code.. messy


    // autoanimate
    // const [parent] = useAutoAnimate<HTMLDivElement>()

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

    // zustand 
    const { categoryList, resetEverything, addCategory } = useTodoStore<any>((states) => states)


    // getting the index base on listName
    const getIndex = (listName: string) => {

        if (getIsUsedIndex > 0) {
            return categoryList[getIsUsedIndex].todoList.map((item: any) => {
                return item.list
            }).indexOf(listName)
        }

    }
    //  to get the isUsed that is true, return an index 
    const getIsUsedIndex = (() => {
        return categoryList.map((item: categoryList) => item.isUsed).indexOf(true)
    })()

    // Fn for submit
    function onSubmitHandler(data: IFormInputs) {
        const deepClone = _.cloneDeep(categoryList);

        //  checker if any category list is selected
        // checking a duplicates
        const getIndex = (listName: string) => {
            return deepClone[getIsUsedIndex]?.todoList.some((item: any) => {
                return item.list === listName
            })
        }

        if (getIndex(data.todoList) === false) {
            const deepClone = _.cloneDeep(categoryList);
            deepClone[getIsUsedIndex].todoList = [...deepClone[getIsUsedIndex].todoList, { list: data.todoList, isChecked: false }]

            resetEverything(deepClone)
        }
        reset()

    }

    // Fn for checking the list 
    function changeChecked(listName: string) {
        const deepClone = _.cloneDeep(categoryList);

        // getting the index base on listName
        const getIndex = (listName: string) => {
            return deepClone[getIsUsedIndex]?.todoList.map((item: any) => {
                return item.list
            }).indexOf(listName)
        }

        deepClone[getIsUsedIndex].todoList[getIndex(listName)].isChecked = !deepClone[getIsUsedIndex].todoList[getIndex(listName)].isChecked
        resetEverything(deepClone)
    }

    // 
    function deleteList(listName: string) {
        const deepClone = _.cloneDeep(categoryList);

        // getting the index base on listName
        const getIndex = (listName: string) => {
            return deepClone[getIsUsedIndex]?.todoList.map((item: any) => {
                return item.list
            }).indexOf(listName)
        }

        deepClone[getIsUsedIndex].todoList.splice(getIndex(listName), 1)
        resetEverything(deepClone)
    }

    // Fn reverseData
    const reverseData = (() => {
        const deepClone = _.cloneDeep(categoryList[getIsUsedIndex]?.todoList);

        deepClone?.reverse();
        return deepClone
    })()

    return (
        <div className='w-full gap-4 flex flex-col items-center justify-center'>

            <form action="#" onSubmit={handleSubmit(onSubmitHandler)} className='w-full'>
                <label htmlFor="todoList">
                    <div className='w-full'>
                        <input disabled={getIsUsedIndex === -1 && true} autoComplete="off" {...register("todoList")} placeholder='Write a new task...' className='placeholder:font-normal placeholder:text-xs placeholder:md:text-sm placeholder:lg:text-base font-normal text-xs md:text-sm lg:text-base px-6 py-4 w-full h-11 lg:h-16 bg-[#D9D9D9] rounded-2xl outline-0 focus:bg-white' />
                    </div>
                </label>
            </form>

            {/* list */}
            {/* <div ref={parent} className='w-full h-[75vh] scrollbar-hide flex flex-col gap-3'> */}
            <div className='w-full h-[68vh] scrollbar-hide flex flex-col gap-3'>

                {/*  */}
                {
                    reverseData?.map((item: any) => {
                        return (
                            <div key={getUniqueId()} className='bg-white min-w-full flex items-center rounded-2xl px-6 py-4'>

                                <div className='w-full flex gap-4 items-center h-auto'>
                                    {
                                        !item.isChecked ?
                                            <div onClick={() => { changeChecked(item.list) }} className='w-[1.25rem] h-[1.25rem] md:w-[1.813rem] md:h-[1.813rem] bg-[#D9D9D9] rounded-lg md:rounded-[0.625rem] cursor-pointer' />
                                            :
                                            <div onClick={() => { changeChecked(item.list) }} className='w-[1.25rem] h-[1.25rem] md:w-[1.813rem] md:h-[1.813rem] bg-black rounded-lg md:rounded-[0.625rem] cursor-pointer flex justify-center items-center' >
                                                <CheckOutlined className='text-white scale-75 md:scale-100' />
                                            </div>
                                    }
                                    <p className={`${item.isChecked && 'line-through decoration-4'} font-normal text-xs md:text-sm lg:text-base`}>{item.list}</p>
                                </div>
                                <button onClick={() => { deleteList(item.list) }} className='hover:bg-[#EB4747] rounded-full w-7 h-7 flex justify-center items-center cursor-pointer'>
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