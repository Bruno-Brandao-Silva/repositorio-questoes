
import { GetStaticProps } from "next"
import useSWR from "swr"
import DefaultHead from "../../components/DefaultHead"
import Header from "../../components/Header"
import InfinityLoading from "../../components/InfinityLoading"
import QuestionComponent from "../../components/Question"
import { server } from "../../config"
import Discipline from "../../models/discipline"
import Question from "../../models/question"

const fetcher = async (url: string) => await fetch(url).then((res) => res.json())

export default function Questions({ questions, disciplines }: { questions: Question[], disciplines: Discipline[] }) {
    return <>
        <h1>Questões</h1>
        <div>
            {questions.map((question: Question, index: number) => (
                <QuestionComponent key={index} question={question} disciplines={disciplines}></QuestionComponent>
            ))}
        </div>
    </>
}

export const getStaticProps: GetStaticProps = async () => {
    console.log(server)
    const questionsData = await fetch(`${server}/api/question/`).then((res) => res.json())
    const disciplineData = await fetch(`${server}/api/discipline/`).then((res) => res.json())

    return {
        props: {
            questions: questionsData,
            disciplines: disciplineData,
        },
        revalidate: 10
    }
}
