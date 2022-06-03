import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import DefaultHead from '../components/DefaultHead'
import DisciplineComponent from '../components/Discipline'
import Header from '../components/Header'
import InfinityLoading from '../components/InfinityLoading'
import Discipline from '../models/discipline'

const fetcher = async (url: any) => await fetch(url).then((res) => res.json())

const Home: NextPage = () => {
  const { data, error } = useSWR('/api/discipline', fetcher)
  if (error) {
    console.log(error)
    return <div>Failed to load</div>
  }
  if (!data) {
    return <InfinityLoading active={true} />
  }
  return (
    <>
      <DefaultHead />
      <Header />
      <div>
        <h3><Link href="/discipline/">/discipline/create</Link></h3>
        <div>
          <>
            {
              data.map((p: any, i: any) => (
                // console.log(p),
                <DisciplineComponent key={i}  discipline={p} />
              ))
            }
          </>
        </div>
      </div>
    </>
  )
}

export default Home
