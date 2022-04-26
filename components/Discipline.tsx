import Link from 'next/link'

export default function DisciplineComponent(discipline: any) {
    return (
        <li>
            <b>
                <Link href="/discipline/[id]" as={`/discipline/${discipline.discipline.id}`}>
                    <a>{discipline.discipline.name}</a>
                </Link>
            </b>
        </li>
    )
}
