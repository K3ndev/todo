import type { NextPage } from 'next'
import { useState, useEffect, useMemo } from 'react'
import { useTodoStore } from '../../store/todoStore'
// import { useAutoAnimate } from '@formkit/auto-animate/react'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { AiOutlineDelete } from 'react-icons/ai'
import { BsCheckSquareFill } from 'react-icons/bs'
import { IconContext } from "react-icons";


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
    // const [parent] = useAutoAnimate<HTMLDivElement>()

    // zustand 
    const { categoryList, resetEverything } = useTodoStore<any>((states) => states)

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
                                    <button onClick={() => { changeChecked(item.list) }} className={`${item.isChecked ? 'bg-white' : 'bg-[#D9D9D9]'} min-w-[1.25rem] min-h-[1.25rem] lg:min-w-[1.5rem] lg:min-h-[1.5rem] rounded-lg flex items-center justify-center`}>
                                        {
                                            item.isChecked &&
                                            <IconContext.Provider value={{ color: "black", className: "rounded-lg " }}>
                                                <div>
                                                    <BsCheckSquareFill />
                                                </div>
                                            </IconContext.Provider>
                                        }
                                    </button>
                                    <p className={`${item.isChecked && 'line-through decoration-4'} font-normal text-xs md:text-sm lg:text-base`}>{item.list}</p>
                                </div>
                                <button onClick={() => { deleteList(item.list) }} className='hover:bg-[#EB4747] rounded-full w-7 h-7 flex justify-center items-center cursor-pointer'>
                                    <AiOutlineDelete />
                                </button>
                            </div>
                        )
                    })
                }



            </div>
        </div >


    )

}