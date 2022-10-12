/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import Layout from '../layout/index'
import Head from 'next/head'
import { TodoList, Sidebar, ModalLogin } from '../components/index'
import { format } from 'date-fns'
import Image from 'next/image'
import { useTodoStore } from '../store/todoStore'
import { useEffect } from 'react'

const Home: NextPage = () => {


  // states 
  const date = new Date()
  const day = format(date, "iiii")
  const month = format(date, "MMM")
  const dayNum = format(date, "dd")
  const periodFN = () => {
    const tempPeriod = format(date, "a")
    if (tempPeriod === 'PM') {
      return 'afternoon';
    } else {
      return 'morning'
    }
  }
  const period = periodFN()

  // store
  const { humanName } = useTodoStore<any>((states: any) => states)

  return (
    <>
      <Head>
        <title>Dona Clone</title>
      </Head>

      <Layout>

        {/* sidebar */}
        <Sidebar />

        {/* main todolist */}
        <section className='flex flex-col gap-7 w-full h-[90vh] items-center'>


          <div className='w-full lg:w-[66%] flex flex-col gap-4'>

            <div className='w-full flex justify-start mt-9'>
              <div className='flex gap-5'>
                <img src="/dona_Avatar.svg" alt="dona_Avatar" className='w-[25px] md:w-[35px]' />
                <div className='w-full'>
                  <ModalLogin />
                  <h1 className='text-xl	md:text-2xl lg:text-3xl font-normal text-black leading-none w-full'>Good {period}, {humanName.length == false ? 'Human' : humanName}</h1>
                  <p className='text-base	md:text-base lg:text-2xl font-normal text-[#6D6D6D] leading-6'>It&apos;s  {day}, {month} {dayNum}   </p>
                </div>

              </div>
            </div>

            <TodoList />
          </div>
        </section>

      </Layout>


    </>
  )
}

export default Home
