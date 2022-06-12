import { ObjectId } from 'mongodb'
import Link from 'next/link'
import { useState } from 'react'
import Question from '../models/question'
import styles from '../styles/QuestionCad.module.css'

type Props = {
    title: string
    description: string
    _id?: ObjectId
}

export default function QuestionComponent(props: { question: Props | Question, isPreview?: boolean }) {
    var link = ``
    var linkAs = ``
    if (props.question._id) {
        link = `/question/[id]`
        linkAs = `/question/${props.question._id}`
        return (
            <Link href={link} as={linkAs} passHref>
                <div className={styles.ContainerPreview}>
                    <fieldset className={styles.FieldsetPreview}>
                        <div className={styles.ImageControlBox}>
                        </div>
                        <div className={styles.Link}>
                            <label className={styles.LabelName}>{props.question.title || 'Título'}</label>
                            <label className={styles.LabelDescription}>{props.question.description || 'Descrição'}</label>
                            <br></br>
                        </div>
                    </fieldset>
                </div>
            </Link >
        )
    } else {
        return (
            <div className={styles.ContainerPreview}>
                <fieldset className={styles.FieldsetPreview}>
                    <div className={styles.ImageControlBox}>
                    </div>
                    <div className={styles.Link}>
                        <label className={styles.LabelName}>{props.question.title || 'Título'}</label>
                        <label className={styles.LabelDescription}>{props.question.description || 'Descrição'}</label>
                        <br></br>
                    </div>
                </fieldset>
            </div>
        )
    }
}
