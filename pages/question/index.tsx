
import { GetStaticProps } from "next"
import QuestionComponent from "../../components/Question"
import { server } from "../../config"
import Discipline from "../../models/discipline"
import Question from "../../models/question"

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
