import Link from 'next/link'
import Discipline from '../models/discipline'

export default function DisciplineComponent(discipline: Discipline) {
    return (
        <li>
            <Link href="/person/[id]" as={`/person/${discipline.id}`}>
                <a>{discipline.name} </a>
            </Link>
        </li>
    )
}
