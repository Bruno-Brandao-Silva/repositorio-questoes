import Link from 'next/link'
import { server } from '../config'
import Discipline from '../models/discipline'
import Question from '../models/question'
import styles from '../styles/QuestionCad.module.css'

export default function QuestionComponent({ question, disciplines }: { question: Question, disciplines: Discipline[] }) {
    var link = ``
    var linkAs = ``
    link = `/question/[id]`
    linkAs = `/question/${question!._id}`
    const disciplineData = disciplines.find(discipline => discipline._id === question.discipline)
    return (
        <Link href={link} as={linkAs} passHref>
            <div className={styles.ContainerPreview}>
                <img alt={disciplineData!.name} src={`api/image/${disciplineData!.imageFilesName![0]}`}></img>
                <fieldset className={styles.FieldsetPreview}>
                    <div className={styles.Link}>
                        <label className={styles.LabelName}>{question.title || 'Título'}</label>
                        <label className={styles.LabelDescription}>{question.description || 'Descrição'}</label>
                    </div>
                </fieldset>
            </div>
        </Link >
    )
}


