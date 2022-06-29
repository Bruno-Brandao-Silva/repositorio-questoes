import { GetStaticProps } from "next";
import DisciplineComponent from "../../components/Discipline";
import { server } from "../../config";
import Discipline from "../../models/discipline";

export default function Disciplines({ disciplines }: { disciplines: Discipline[] }) {

    return <>
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
        },
        revalidate: 10,
    }
}