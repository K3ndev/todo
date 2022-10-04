import { NextPage } from "next";
import { useState, useMemo } from 'react'
import Image from 'next/image'

export const Sidebar: NextPage = () => {

    // states
    const [category, setCategory] = useState([])

    // Fn
    const getTodoListReverse = useMemo(() => {
        return category.reverse()
    }, [category])
    const getUniqueId = useMemo(() => {
        return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
    }, [])
    const tempCurrentId = useMemo(() => getUniqueId, [getUniqueId])

    return (
        <aside className='hidden lg:inline-flex justify-center p-10 w-[45%] h-[90vh] bg-white rounded-[20px]'>

            {/* categoryList */}
            <ul className="flex flex-col w-full gap-4">
                <li>
                    <button className="flex justify-between items-center bg-[#EAEDEE] rounded-[20px] px-6 py-4 w-full h-16">
                        <div className="flex gap-6">
                            <Image
                                src="/dona_Avatar.svg"
                                alt="dona_Avatar"
                                height={15} width={15}
                            />
                            <p className="font-normal text-black text-base">Home</p>
                        </div>
                        <div className="bg-[#D9D9D9] rounded-lg w-7 h-7 text-[#6D6D6D] flex justify-center items-center ">2</div>
                    </button>
                </li>

                {/* list HERE */}

                <li className="flex w-full h-16 justify-center items-center px-6 py-4 gap-8">
                    <div className="text-xl">+</div>
                    <input type="text" autoComplete="off" placeholder="Create new category..." className="w-full outline-0 line-clamp-3 placeholder:font-normal placeholder:text-sm text-sm" />
                </li>
            </ul>


        </aside>
    )
}

