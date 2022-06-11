import type { NextPage } from 'next'
import useSWR from 'swr'
import DefaultHead from '../components/DefaultHead'
import DisciplineComponent from '../components/Discipline'
import Header from '../components/Header'
import InfinityLoading from '../components/InfinityLoading'


const Home: NextPage = () => {
  
  return (
    <>
      <DefaultHead />
      <Header />
      <h1>Pagina inicial</h1>
    </>
  )
}

export default Home
