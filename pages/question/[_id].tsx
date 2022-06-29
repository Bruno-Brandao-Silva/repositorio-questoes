import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'
import InfinityLoading from '../../components/InfinityLoading'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}
export default function Question() {
  const [status, setStatus] = useState(true)
  const { query } = useRouter()
  const { data, error } = useSWR(
    () => query._id && `/api/question/${query._id}`,
    fetcher
  )

  if (error) {
    return <>
      <h1>Error</h1>
      <p>{error.message}</p>
    </>
  }
  if (!data) {
    return <>
      <InfinityLoading active={true} />
    </>
  }
  return (
    <>
      {/* <QuestionComponent question={data} /> */}
    </>
  )
}

