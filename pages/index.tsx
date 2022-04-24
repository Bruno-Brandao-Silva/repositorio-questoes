import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
const Home: NextPage = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <p></p>
      <p></p>
      <p></p>
      <form action="/api/disciplines/search" className="search-bar">
        <input id="content" name="content" type="text" placeholder="Search"></input>
        <button type="submit" className="btn btn-search">Buscar</button>
      </form>
      <Link href="/discipline/create">/discipline/create</Link>
    </div>
  )
}

export default Home
