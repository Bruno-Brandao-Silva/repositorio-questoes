import { GetStaticProps } from "next";
import useSWR from "swr";
import DefaultHead from "../../components/DefaultHead";
import DisciplineComponent from "../../components/Discipline";
import Header from "../../components/Header";
import InfinityLoading from "../../components/InfinityLoading";
import { server } from "../../config";
import Discipline from "../../models/discipline";

export default function Disciplines({ disciplines }: { disciplines: Discipline[] }) {

    return <>
        <DefaultHead />
        <Header />
        <h1>Disciplinas</h1>
        <div>
            {
                disciplines.map((p: any, i: any) => (
                    <DisciplineComponent key={i} discipline={p} />
                ))
            }
        </div>
    </>
}

export const getStaticProps: GetStaticProps = async () => {
    const data = await fetch(`${server}/api/discipline/`).then((res) => res.json())
    return {
        props: {
            disciplines: data,
        }
    }
}