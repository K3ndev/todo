/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import { Modal } from '@mantine/core';
import { useTodoStore } from '../../store/todoStore'
import { useDebouncedValue } from '@mantine/hooks';

export const ModalLogin = () => {

    // states
    const [opened, setOpened] = useState(true);
    // name 
    const [humanName, setHumanName] = useState<string>('')
    const [humanNameDeb] = useDebouncedValue(humanName, 200);

    // store
    const { humanName: name, changeHumanName } = useTodoStore<any>((states: any) => states)

    // input fN
    function inputNameHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setHumanName(e.target.value)
    }

    useEffect(() => {
        changeHumanName(humanNameDeb)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [humanNameDeb])

    return (
        <>
            <Modal
                // animation 
                transition="fade"
                transitionDuration={600}
                transitionTimingFunction="ease"

                // css
                // radius={20}
                centered

                withCloseButton={false}
                size="auto"
                opened={opened}
                onClose={() => setOpened(true)}
            >
                <div className='w-screen h-screen  md:w-[31.25rem] md:h-[31.25rem] flex flex-col p-10 custom-gradient'>
                    <div className='h-[30.125rem] flex justify-center items-center drop-shadow-xl'>
                        <img src="./logo.png" alt="logo" className='' />
                    </div>

                    <div className='flex flex-col justify-between w-full h-full gap-2'>
                        <div className='w-full'>
                            <h1 className='text-2xl md:text-xl font-bold'>Welcome to Dona Clone</h1>
                            <p className='text-base md:text-sm text-[#808080] md:w-[65%]'>Dona is a back to-do list focused on fast and delightful user experience.</p>
                        </div>

                        <div className='w-full flex flex-col'>
                            <h1 className='text-base'>What&apos;s your name?</h1>
                            <input autoComplete="off" value={humanName} onChange={inputNameHandler} type="text" placeholder='Type it here' className='outline-none focus:border-b-2 w-[40%] text-[#195786] text-sm h-7' />
                            <button onClick={() => setOpened(!opened)} className='w-[34%] text-center bg-[#008FFD] hover:bg-[#0276cf] p-2 text-white rounded-[0.625rem] mt-10 text-base'>
                                <div>
                                    Continue
                                </div>
                            </button>
                            <div className='md:hidden w-full h-36'></div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}