import type { NextPage } from 'next'
import { Input } from '../index'

export const TodoList: NextPage = () => {

    return (
        <section className=' lg:block w-full space-y-5'>
            <Input />
            <h2>todolist</h2>
        </section>
    )
}