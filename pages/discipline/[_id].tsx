import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'
import DefaultHead from '../../components/DefaultHead'
import DisciplineComponent from '../../components/Discipline'
import Header from '../../components/Header'
import InfinityLoading from '../../components/InfinityLoading'
import styles from '../../styles/Discipline.module.css'

const fetcher2 = async (url: string) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}
const fetcher = async (url: string) => await fetch(url).then((res) => { return res.json() }).catch(res => { throw new Error(res.message) })

export default function Discipline() {
  const [status, setStatus] = useState(true)
  const { query } = useRouter()
  const { data, error } = useSWR(
    () => query._id && `/api/discipline/${query._id}`,
    fetcher2
  )

  if (error) {
    return <>
      <DefaultHead />
      <Header />
      <h1>Error</h1>
      <p>{error.message}</p>
    </>
  }
  if (!data) {
    return <>
      <DefaultHead />
      <Header />
      <InfinityLoading active={true} />
    </>
  }

  return (
    <>
      <DefaultHead />
      <Header />
      <div className={styles.ContainerBlock}>
        <div className={styles.ContainerFlex}>
          <div className={styles.ImageContainer}>
            <img src={'../api/image/' + data.imageFilesName[0]} alt={data.name} />
          </div>
          <div className={styles.TitleContainer}>
            <label>{data.name}</label>
          </div>
          <div className={styles.DescriptionContainer}>
            <label>{data.description}</label>
          </div>
        </div>
      </div>
    </>
  )
}

