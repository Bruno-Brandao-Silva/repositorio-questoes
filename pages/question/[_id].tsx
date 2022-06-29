import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from '../../styles/Question.module.css'
import useSWR from 'swr'
import InfinityLoading from '../../components/InfinityLoading'
import Discipline from '../../models/discipline'
import Question from '../../models/question'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}
export default function QuestionPage() {
  const [status, setStatus] = useState(true)
  const { query } = useRouter()
  const { data, error } = useSWR(
    () => query._id && `/api/question/${query._id}`,
    fetcher
  ) as { data: Question; error: any }
  const { data: dataDiscipline, error: errorDiscipline } = useSWR(
    () => data?.discipline! && `/api/discipline/${data.discipline}`,
    fetcher
  ) as { data: Discipline; error: any }
  if (error) {
    return <>
      <h1>Error</h1>
      <p>{error.message}</p>
    </>
  }
  if (!data || !dataDiscipline) {
    return <>
      <InfinityLoading active={true} />
    </>
  }
  return (
    <>
      <InfinityLoading active={false} />
      <div className={styles.Container}>
        <div className={styles.Discipline}>
          {/* img dataDiscipline */}
          <img src={dataDiscipline.imageFilesName?.[0]} alt='Discipline Image' />
          <h1>{dataDiscipline.name}</h1>
        </div>
        <div className={styles.Question}>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          <div className={styles.Answers}>
            {/* {data?.answers?.map((answer, index) => (
              <div key={index} className={styles.Answer}>
                <input type="radio" name="answer" id={`answer${index}`} />
                <label htmlFor={`answer${index}`}>{answer}</label>
              </div>
            ))} */}
          </div>
          <button onClick={() => setStatus(!status)}>{status ? 'Responder' : 'Cancelar'}</button>
        </div>
      </div>
    </>
  )
}

