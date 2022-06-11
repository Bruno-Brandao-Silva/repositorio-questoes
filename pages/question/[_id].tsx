import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'
import DefaultHead from '../../components/DefaultHead'
import Header from '../../components/Header'
import InfinityLoading from '../../components/InfinityLoading'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}
const fetcher3 = async (url: string) => await fetch(url).then((res) => { return res.json() }).catch(res => { throw new Error(res.message) })

export default function Discipline() {
  const [status, setStatus] = useState(true)
  const { query } = useRouter()
  const { data, error } = useSWR(
    () => query._id && `/api/discipline/${query._id}`,
    fetcher
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
      <table>
        <thead>
          <tr>
            <th>Disciplina</th>
            <th>Descrição</th>
            <th>Quantidade de conteúdos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.name}</td>
            <td>{data.description}</td>
            <td>{data.length}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

