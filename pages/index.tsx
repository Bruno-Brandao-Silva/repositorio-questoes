import type { GetStaticProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import DisciplineComponent from '../components/Discipline'
import QuestionComponent from '../components/Question'
import { server } from '../config'
import Discipline from '../models/discipline'
import Question from '../models/question'

export default function Home({ Disciplines, Questions }: { Disciplines: Discipline[], Questions: Question[] }) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { data } = useSWR(`/api/profile/`, fetcher)
  if (data === 404 && status === 'authenticated') {
    router.push('/profile')
  }
  return (
    <div>
      <h1>Disciplinas</h1>
      <div className='itensContainer'>
        {Disciplines?.map((p: any, i: any) => (
          i < 3 ? <DisciplineComponent key={i} discipline={p} /> : null
        ))}
      </div>
      <h1>Questões</h1>
      <div className='itensContainer'>
        {Questions?.map((question: Question, index: number) => (
          <QuestionComponent key={index} question={question} disciplines={Disciplines}></QuestionComponent>
        ))}
      </div>
    </div>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  const Questions = await fetch(`${server}/api/question/`).then((res) => res.json())
  const Disciplines = await fetch(`${server}/api/discipline/`).then((res) => res.json())
  return {
    props: {
      Questions,
      Disciplines
    },
    revalidate: 5
  }
}
const fetcher = async (url: string) => await fetch(url).then(async (res) => {
  if (res.status !== 200) {
    return res.status
  }
  const data = await res.json()
  return data
}).catch((err) => { return err })