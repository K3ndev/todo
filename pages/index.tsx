import type { NextPage } from 'next'
import Layout from '../layout/index'
import Head from 'next/head'
import { TodoList } from '../components/index'
import { format } from 'date-fns'
import Image from 'next/image'

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

  return (
    <>
      <Head>
        <title>Dona Clone</title>
      </Head>
      <Layout>


        <section className='hidden lg:block w-[40%] h-full bg-white rounded-[20px]'>side bar</section>

        <div className='flex flex-col gap-7 w-full'>
          <div className=''>


            <div className='flex space-y-4'>
              <Image
                src="/dona_Avatar.svg"
                alt="dona_Avatar"
                height={35} width={35}
                className='w-20'
              />
              <div className=''>
                <h1 className=''>Good {period}, ken</h1>
                <p className=''>It&apos;s  {day}, {month} {dayNum}   </p>
              </div>
            </div>

          </div>

          <TodoList />
        </div>

      </Layout>


    </>
  )
}

export default Home
