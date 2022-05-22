import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import DisciplineComponent from '../components/Discipline'
import Header from '../components/Header'
import InfinityLoading from '../components/InfinityLoading'
import Discipline from '../models/discipline'

const fetcher = async (url: any) => await fetch(url).then((res) => res.json())

const Home: NextPage = () => {
  const { data, error } = useSWR('/api/disciplines', fetcher)
  if (error) {
    console.log(error)
    return <div>Failed to load</div>
  }
  if (!data) {
    return <InfinityLoading active={true} />
  }
  return (
    <>
      <Head>
        <title>RepoQuest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ textAlign: 'center' }}>
        <Header />
        <h3><Link href="/discipline/create">/discipline/create</Link></h3>
      </div>
      <div>
        <ul>
          {
            data.map((p: any, i: any) => (
              console.log(p),
              <DisciplineComponent key={i} discipline={p} />
            ))}
        </ul>
      </div>
    </>
  )
}

export default Home
