import { NextPage } from "next";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Image from 'next/image'
import { useTodoStore } from '../../store/todoStore'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { off } from "process";


// type safe
interface IFormInputs {
    todoCategory: string
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

    // store
    const { categoryList, addTodo, resetEverything } = useTodoStore<any>((states: any) => states)

    // states
    const tempCategory = categoryList;

    // for auto animate
    const [parent] = useAutoAnimate<HTMLDivElement>()

    const {
        register,
        handleSubmit,
        reset: inputReset,
    } = useForm<IFormInputs>({
        resolver: yupResolver(schema)
    });


    // Fn
    const isCategory = (input: string) => {
        return categoryList.find((item: categoryList) => {
            return item.categoryName === input
        })
    }
    // return index of isUsed
    const getIsUsedIndex = () => {
        return categoryList.map((item: categoryList) => item.isUsed).indexOf(true)
    }
    const onSubmitHandler = (data: IFormInputs) => {
        if (isCategory(data.todoCategory) === undefined) {
            addTodo(data.todoCategory, [])
        }
        inputReset()
    }
    const onClickHandler = (categoryName: string) => {
        // i don't know how to use map inside of set() in zustand so this is temporary
        const reset = () => {
            tempCategory.map((item: categoryList) => {
                item.isUsed = false;
            })
            tempCategory.map((item: categoryList) => {
                if (item.categoryName === categoryName) {
                    item.isUsed = true;
                }
            })
        }
        reset();
        resetEverything(tempCategory)
    }
    const onDeleteClickHandler = (categoryName: string) => {
        if (categoryName !== 'Home') {
            const findIndex = () => {
                return tempCategory.map((item: categoryList) => {
                    return item.categoryName
                }).indexOf(categoryName)
            }
            tempCategory.splice(findIndex(), 1);
            resetEverything(tempCategory)
        }
    }

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
                                    <div onClick={() => onClickHandler(item.categoryName)} className={`${item.isUsed && 'bg-[#EAEDEE]'} flex justify-between items-center rounded-[20px] w-full h-16 cursor-pointer`}>
                                        <div className="flex gap-6 items-center pl-6 py-4" >
                                            <Image
                                                src="/dona_Avatar.svg"
                                                alt="dona_Avatar"
                                                height={15} width={15}
                                            />
                                            <p className="font-normal text-black text-base">{item.categoryName}</p>
                                        </div>

                                        {/* using css, that will change the content */}
                                        {item.categoryName === 'Home' ?
                                            <div className="bg-[#D9D9D9] rounded-lg w-7 h-7 text-[#6D6D6D] flex justify-center items-center mr-6">
                                                <p>
                                                    {item.todoList.length}
                                                </p>
                                            </div>
                                            :
                                            <div onClick={() => onDeleteClickHandler(item.categoryName)} className="cursor-pointer item-custom bg-[#D9D9D9] rounded-lg w-7 h-7 text-[#6D6D6D] flex justify-center items-center mr-6 hover:bg-[#EB4747]">
                                                <p className="new-label">
                                                    <span>{item.todoList.length}</span>
                                                </p>
                                            </div>}

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

