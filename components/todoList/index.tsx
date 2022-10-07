import type { NextPage } from 'next'
import { useState, useEffect, useMemo } from 'react'
import { Input } from '../index'
import { useTodoStore } from '../../store/todoStore'
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface categoryList {
    categoryName: string,
    isUsed: boolean,
    todoList: []
}


export const TodoList: NextPage = () => {

    // states 
    const [tempList, setTempList] = useState<[]>([])

    // autoanimate
    const [parent] = useAutoAnimate<HTMLDivElement>()

    // zustand 
    const { categoryList } = useTodoStore<any>((states) => states)

    // get isUsed

    // get uniqueID 
    const getUniqueId = () => {
        return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
    }

    const getIsUsed = () => {
        return categoryList.filter((item: categoryList) => {
            return item.isUsed === true
        })
    }
    const result = getIsUsed()





    return (
        <div className='w-full gap-4 flex flex-col items-center justify-center'>

            <Input />

            {/* list */}
            <div ref={parent} className='w-full h-[78vh] scrollbar-hide flex flex-col gap-3'>

                {/*  */}
                {
                    result[0]?.todoList?.map((item: []) => {
                        return (
                            <div key={getUniqueId()} className='w-full'>
                                <p className='font-normal text-xs px-6 py-4 w-full h-11 lg:h-16 bg-white rounded-2xl outline-0'>{item}</p>
                            </div>
                        )
                    })
                }


            </div>
        </div >
    )
}