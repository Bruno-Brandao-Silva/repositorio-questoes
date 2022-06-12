
import useSWR from "swr"
import DefaultHead from "../../components/DefaultHead"
import Header from "../../components/Header"
import InfinityLoading from "../../components/InfinityLoading"
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
    const page: any = []
    data.map((question: Question, index: number) => {
        page.push(<h1 key={index}>{JSON.stringify(question)}</h1>)
    })
    return <>
        <DefaultHead />
        <Header />
        <h1>Questões</h1>
        {page}
    </>
}