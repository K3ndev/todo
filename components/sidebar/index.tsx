import { NextPage } from "next";
import { useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Image from 'next/image'
import { useTodoStore } from '../../store/todoStore'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { AiOutlineDelete } from 'react-icons/ai'


// type safe
interface IFormInputs {
    todoCategory: string
}
interface store {
    categoryList: [],
    currentCategory: '',
    resetIsUsed: () => void,
    deleteTodo: () => void
}

interface categoryList {
    categoryName: string,
    isUsed: boolean,
    todoList: []

}

// validation
const schema = yup.object({
    todoCategory: yup.string().required(),
}).required();



export const Sidebar: NextPage = () => {

    // states
    const [currentCategory, setCurrentCategory] = useState<string[]>([])
    const [inputCurrent, setInputCurrent] = useState('')

    // for auto animate
    const [parent] = useAutoAnimate<HTMLDivElement>()

    // store
    const { addTodo, categoryList, resetIsUsed } = useTodoStore<any>((states) => states)

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<IFormInputs>({
        resolver: yupResolver(schema)
    });


    // Fn
    const isCategory = (input: string) => {
        return categoryList.find((item: categoryList) => {
            return item.categoryName === input
        })
    }
    const getAllCurrentCategory = () => {
        categoryList.map((item: categoryList) => {
            setCurrentCategory((prev) => {
                return [...prev, item.categoryName];
            })
        })
    }
    const getIsUsedIndex = () => {
        return categoryList.map((item: categoryList) => item.isUsed).indexOf(true)
    }
    const onSubmitHandler = (data: IFormInputs) => {
        if (isCategory(data.todoCategory) === undefined) {
            addTodo(data.todoCategory, [])
        }
        reset()
    }
    const onClickHandler = (categoryName: string) => {
        // console.log(categoryList.filter((item: categoryList) => {
        //     return item.categoryName === categoryName
        // }))
        resetIsUsed(getIsUsedIndex)
    }
    const onDeleteClickHandler = (categoryName: string) => {
        // console.log(getIsUsedIndex())
    }



    console.log(categoryList)

    return (
        <aside className='hidden lg:inline-flex justify-center p-10 w-[45%] h-[90vh] bg-white rounded-[20px]'>

            {/* categoryList */}
            <div className='w-full h-[82vh] scrollbar-hide'>
                <div ref={parent} className="flex flex-col w-full gap-4">

                    {/* list */}
                    {
                        categoryList.map((item: categoryList) => {
                            return (
                                <div key={item.categoryName}>
                                    <div className={`${item.isUsed && 'bg-[#EAEDEE]'} flex justify-between items-center rounded-[20px] w-full h-16`}>
                                        <button className="flex gap-6 items-center pl-6 py-4" onClick={() => onClickHandler(item.categoryName)} >
                                            <Image
                                                src="/dona_Avatar.svg"
                                                alt="dona_Avatar"
                                                height={15} width={15}
                                            />
                                            <p className="font-normal text-black text-base">{item.categoryName}</p>
                                        </button>

                                        {/* using css, that will change the content */}
                                        <button onClick={() => onDeleteClickHandler(item.categoryName)} className="item-custom bg-[#D9D9D9] rounded-lg w-7 h-7 text-[#6D6D6D] flex justify-center items-center mr-6 hover:bg-[#EB4747]">
                                            <p className="new-label">
                                                <span>{item.todoList.length}</span>
                                            </p>
                                        </button>

                                    </div>
                                </div>

                            )
                        })
                    }

                    {/* input */}
                    <div className="flex w-full h-16 justify-center items-center px-6 py-4 gap-8">
                        <div className="text-xl">+</div>
                        <form action="#" onSubmit={handleSubmit(onSubmitHandler)} className='w-full'>
                            <input {...register("todoCategory")} autoComplete="off" placeholder="Create new category..." className="w-full outline-0 line-clamp-3 placeholder:font-normal placeholder:text-sm text-sm" />
                        </form>
                    </div>

                </div>
            </div>


        </aside >
    )
}

