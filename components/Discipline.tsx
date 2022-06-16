import { ObjectId } from 'mongodb'
import Link from 'next/link'
import { useState } from 'react'
import { server } from '../config'
import Discipline from '../models/discipline'
import styles from '../styles/DisciplineCad.module.css'

type Props = {
    name: string
    description: string
    imageFilesName: string[]
    _id?: ObjectId
}

export default function DisciplineComponent({ discipline, isPreview }: { discipline: Props | Discipline, isPreview?: boolean }) {
    const [imageIndex, setImageIndex] = useState(0)
    var image: string[] = []
    var link = ``
    var linkAs = ``
    if (discipline.imageFilesName) {
        for (let i = 0; i < discipline.imageFilesName.length; i++) {
            if (isPreview && isPreview === true) {
                image.push(discipline.imageFilesName[i])
            } else {
                image.push(`${server}/api/image/${discipline.imageFilesName[i]}`)
            }
        }
    }

    if (discipline._id) {
        link = `/discipline/[id]`
        linkAs = `/discipline/${discipline._id}`

        return (
            <Link href={link} as={linkAs} passHref>
                <div className={styles.ContainerPreview}>
                    <fieldset className={styles.FieldsetPreview}>
                        <div className={styles.ImageControlBox}>
                            <div className={styles.ImageContainerPreview}>
                                <img className={styles.ImagePreview} alt={discipline.name} src={image?.[imageIndex] || '/discipline-placeholder.png'}></img>
                            </div>
                        </div>
                        <div className={styles.Link}>
                            <label className={styles.LabelName}>{discipline.name || 'Disciplina'}</label>
                            <label className={styles.LabelDescription}>{discipline.description || 'Descrição'}</label>
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
                        <div className={styles.ImageContainerPreview}>
                            <img className={styles.ImagePreview} alt={discipline.name} src={image?.[imageIndex] || '/discipline-placeholder.png'}></img>
                        </div>
                    </div>
                    <div className={styles.Link}>
                        <label className={styles.LabelName}>{discipline.name || 'Disciplina'}</label>
                        <label className={styles.LabelDescription}>{discipline.description || 'Descrição'}</label>
                        <br></br>
                    </div>
                </fieldset>
            </div>
        )
    }
}
