/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useTodoStore } from '../../store/todoStore'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

// type
type inputType = {
    todoCategory: string
}

type categoryType = {
    id: number,
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
    const { categoryList, addCategory, changeIsUsed, removeCategory } = useTodoStore<any>((states: any) => states)

    // states
    const tempCategory = categoryList;

    // for auto animate
    const [parent] = useAutoAnimate<HTMLDivElement>()

    // for react hook form
    const {
        register,
        handleSubmit,
        reset: inputReset,
    } = useForm<inputType>({
        resolver: yupResolver(schema)
    });

    // get uniqueID 
    const getUniqueId = () => {
        return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
    }

    // checker, will return boolean
    const checkerCategory = (argCategoryName: string) => {
        return categoryList.some((item: categoryType) => {
            return item.categoryName === argCategoryName
        })
    }

    // to add another category
    const onSubmitHandler = (data: inputType) => {
        if (!checkerCategory(data.todoCategory)) {
            const newCategory = { id: getUniqueId(), categoryName: data.todoCategory, isUsed: false, todoList: [] }
            addCategory(newCategory)
            changeIsUsed(newCategory)
        }
    }

    // to select the target category
    const onClickHandler = (argCategory: categoryType) => {
        changeIsUsed(argCategory)
    }

    // to delete the target category
    const onDeleteClickHandler = (argCategory: categoryType) => {
        removeCategory(argCategory.id)
    }

    return (
        <aside className='hidden lg:inline-flex justify-center p-10 w-[44%] md:w-[34%] h-[90vh] bg-white rounded-[20px]'>

            {/* categoryList */}
            <div className='w-full h-[82vh] scrollbar-hide'>
                <div ref={parent} className="flex flex-col max-w-full gap-4">

                    {/* list */}
                    {
                        categoryList.map((item: categoryType) => {
                            return (

                                <div key={item.categoryName} className='min-w-full flex items-center'>

                                    <div className={`${item.isUsed && 'bg-[#EAEDEE]'} w-full flex justify-between py-4 px-6 rounded-[20px] items-center`}>
                                        <div onClick={() => onClickHandler(item)} className={` w-full flex gap-4 items-center h-auto cursor-pointer`}>
                                            <img src="/dona_Avatar.svg" alt="dona_Avatar" className="max-w-[15px] max-h-[15px]" />
                                            <p className="font-normal text-black text-base custom-text ">{item.categoryName}</p>
                                        </div>

                                        {item.categoryName === 'Home' ?
                                            <div className="max-w-11 max-h-7 bg-[#D9D9D9] rounded-lg px-2 py-[0.15rem] text-[#6D6D6D] flex justify-center items-center">
                                                <p>
                                                    {item.todoList.length}
                                                </p>
                                            </div>
                                            :
                                            <div onClick={() => onDeleteClickHandler(item)} className="max-w-11 max-h-7 cursor-pointer item-custom bg-[#D9D9D9] rounded-lg px-2 py-[0.15rem] text-[#6D6D6D] flex justify-center items-center hover:bg-[#EB4747]">
                                                <p className="new-label">
                                                    <span>{item.todoList.length}</span>
                                                </p>
                                            </div>
                                        }
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

