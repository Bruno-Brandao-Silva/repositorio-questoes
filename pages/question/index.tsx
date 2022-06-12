
import useSWR from "swr"
import DefaultHead from "../../components/DefaultHead"
import Header from "../../components/Header"
import InfinityLoading from "../../components/InfinityLoading"
import QuestionComponent from "../../components/Question"
import Question from "../../models/question"
const fetcher = async (url: string) => await fetch(url).then((res) => res.json())

export default function Questions() {
    const { data, error } = useSWR('/api/question', fetcher)
    if (error) {
        console.log(error)
        return <div>Failed to load</div>
    }
    if (!data) {
        return <InfinityLoading active={true} />
    }
    const table: any = []
    data.map((question: Question, index: number) => {
        const page: any = []
        page.push(<>
            <th key={index}>{question.title}</th>
            <th key={index}>{question.description}</th>
        </>)
        table.push(<tr key={index}>{page}</tr>)
    })
    return <>
        <DefaultHead />
        <Header />
        <h1>Questões</h1>
        {
            data.map((question: Question, index: number) => (
                <QuestionComponent key={index} question={question}></QuestionComponent>
            ))
        }
    </>
}