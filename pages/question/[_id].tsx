import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from '../../styles/Question.module.css'
import useSWR from 'swr'
import InfinityLoading from '../../components/InfinityLoading'
import Discipline from '../../models/discipline'
import Question from '../../models/question'
import { server } from '../../config'
import { GetStaticPaths, GetStaticProps } from 'next'

const fetcher = async (url: string) => {
  const res = await fetch(url)

  if (res.status !== 200) {
    throw new Error(`Error ${res.status}`)
  }
  const data = await res.json()
  return data
}
export default function QuestionPage({ data, dataDiscipline }: { data: Question, dataDiscipline: Discipline }) {
  const [status, setStatus] = useState(true)
  const [showResolution, setShowResolution] = useState(false)
  const { query } = useRouter()
  // const { data, error } = useSWR(
  //   () => query._id && `/api/question/${query._id}`,
  //   fetcher
  // ) as { data: Question; error: any }
  // const { data: dataDiscipline, error: errorDiscipline } = useSWR(
  //   () => data!.discipline! && `/api/discipline/${data.discipline}`,
  //   fetcher
  // ) as { data: Discipline; error: any }
  // if (error) {
  //   return <>
  //     <h1>Error</h1>
  //     <p>{error.message}</p>
  //   </>
  // }
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
          <img src={`${server}/api/image/${dataDiscipline.imageFilesName?.[0]}`} alt='Discipline Image' />
          <h1>{dataDiscipline.name}</h1>
        </div>
        <div className={styles.Question}>
          <h1>{data.title}</h1>
          <h3>{data.description}</h3>
          <p>{data.question}</p>
          {data.imageFilesNameQuestion?.map((imageFileName, index) => (
            imageFileName ? <div className={styles.ImageContainer} key={index}><img key={index} src={`${server}/api/image/${imageFileName}`} alt='Question Image' /><p>Figura {index + 1}</p></div> : null
          ))}
        </div>
        <div className={styles.Answers}>
          <h3>Escolha sua resposta:</h3>
          {data?.answers?.map((answer, index) => (
            <div key={index} className={styles.Answer}>
              <input type="radio" name="answer" id={`answer${index}`} />
              <label htmlFor={`answer${index}`}>{answer}</label>
            </div>
          ))}
          <button onClick={() => setStatus(!status)}>{status ? 'Responder' : 'Cancelar'}</button>
          <a onClick={async () => {
            setShowResolution(!showResolution);
            if (!showResolution) {
              await new Promise(r => setTimeout(r, 100))
              window.scrollTo({ top: 2100, behavior: 'smooth' });
            }
          }}>Mostrar resolução</a>
        </div>
        <div id='Resolution' className={styles.Resolution} style={{ display: (showResolution ? 'block' : 'none') }}>
          <h3>Resolução:</h3>
          <p>{data.resolution}</p>
          {data.imageFilesNameResolution?.map((imageFileName, index) => (
            imageFileName ? <div className={styles.ImageContainer} key={index}><img key={index} src={`${server}/api/image/${imageFileName}`} alt='Resolution Image' /><p>Figura {index + 1}</p></div> : null
          ))}
        </div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { _id } = context.params!
  const data = await fetch(`${server}/api/question/${_id}`).then((res) => res.json())
  const dataDiscipline = await fetch(`${server}/api/discipline/${data.discipline}`).then((res) => res.json())
  return {
    props: {
      data: data,
      dataDiscipline: dataDiscipline
    },
    revalidate: 5
  }
}