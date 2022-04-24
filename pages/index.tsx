import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div>
      <div className="search-bar">
        <input type="text" placeholder="Search"></input>
        <button type="button" className="btn btn-search" onClick={()=>{}}>Buscar</button>
      </div>

    </div>
  )
}

export default Home
