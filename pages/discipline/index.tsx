import useSWR from "swr";
import DefaultHead from "../../components/DefaultHead";
import DisciplineComponent from "../../components/Discipline";
import Header from "../../components/Header";
import InfinityLoading from "../../components/InfinityLoading";

const fetcher = async (url: string) => await fetch(url).then((res) => res.json())

export default function Disciplines() {
    const { data, error } = useSWR('/api/discipline', fetcher)
    if (error) {
        console.log(error)
        return <div>Failed to load</div>
    }
    if (!data) {
        return <InfinityLoading active={true} />
    }
    return <>
        <DefaultHead />
        <Header />
        <h1>Disciplinas</h1>
        <div>
            {
                data.map((p: any, i: any) => (
                    // console.log(p),
                    <DisciplineComponent key={i} discipline={p} />
                ))
            }
        </div>
    </>
}