import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import DisciplineComponent from '../components/Discipline'
import Discipline from '../models/discipline'

const fetcher = async (url: any) => await fetch(url).then((res) => res.json())

const Home: NextPage = () => {
  const { data, error } = useSWR('/api/disciplines', fetcher)
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  return (
    <>
      <Head>
        <title>RepoQuest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ textAlign: 'center' }}>
        <p></p>
        <p></p>
        <p></p>
        <form action="/api/disciplines/search" className="search-bar">
          <input id="content" name="content" type="text" placeholder="Search"></input>
          <button type="submit" className="btn btn-search">Buscar</button>
        </form>
        <Link href="/discipline/create">/discipline/create</Link>
        <br></br>
        <Link href="/api/auth/login">Login</Link>
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
