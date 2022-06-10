import { ObjectId } from 'mongodb'
import Link from 'next/link'
import { useState } from 'react'
import useSWR from 'swr'
import Discipline from '../models/discipline'
import styles from '../styles/DisciplineCad.module.css'

const fetcher = async (url: any) => await fetch(url).then((res) => res)

type Props = {
    name: string
    description: string
    length: string
    imageFilesName: string[]
    _id?: ObjectId
}

export default function DisciplineComponent(props: { discipline: Props | Discipline, isPreview?: boolean }) {
    const [imageIndex, setImageIndex] = useState(0)
    var image: string[] = []
    var link = ``
    var linkAs = ``
    if (props.discipline.imageFilesName) {
        for (let i = 0; i < props.discipline.imageFilesName.length; i++) {
            if (props.isPreview && props.isPreview === true) {
                image.push(props.discipline.imageFilesName[i])
            } else {
                image.push(window.location.origin + '/api/image/' + props.discipline.imageFilesName[i])
            }
        }
    }
    const PreviousImageButton = () => {
        if (imageIndex > 0) {
            setImageIndex(imageIndex - 1)
        }
    }
    const NextImageButton = () => {
        if (image) {
            if (imageIndex < image.length - 1) {
                setImageIndex(imageIndex + 1)
            }
        }
    }

    if (props.discipline._id) {
        link = `/discipline/[id]`
        linkAs = `/discipline/${props.discipline._id}`

        return (
            <div className={styles.ContainerPreview}>
                <fieldset className={styles.FieldsetPreview}>
                    <div className={styles.ImageControlBox}>
                        <div className={styles.PreviousImageButton} onClick={PreviousImageButton}>
                            <div className={styles.Bar1}></div>
                            <div className={styles.Bar2}></div>
                        </div>
                        <div className={styles.ImageContainerPreview}>
                            <img className={styles.ImagePreview} alt={props.discipline.name} src={image?.[imageIndex] || 'discipline-placeholder.png'}></img>
                        </div>
                        <div className={styles.NextImageButton} onClick={NextImageButton}>
                            <div className={styles.Bar1}></div>
                            <div className={styles.Bar2}></div>
                        </div>
                    </div>
                    <Link href={link} as={linkAs} passHref>
                        <div className={styles.Link}>
                            <label className={styles.LabelName}>{props.discipline.name || 'Disciplina'}</label>
                            <label className={styles.LabelDescription}>{props.discipline.description || 'Descrição'}</label>
                            <label className={styles.LabelLength}>{props.discipline.length || 'Tamanho'}</label>
                        </div>
                    </Link >
                </fieldset>
            </div>
        )
    } else {
        return (
            <div className={styles.ContainerPreview}>
                <fieldset className={styles.FieldsetPreview}>
                    <div className={styles.ImageControlBox}>
                        <div className={styles.PreviousImageButton} onClick={PreviousImageButton}>
                            <div className={styles.Bar1}></div>
                            <div className={styles.Bar2}></div>
                        </div>
                        <div className={styles.ImageContainerPreview}>
                            <img className={styles.ImagePreview} alt={props.discipline.name} src={image?.[imageIndex] || 'discipline-placeholder.png'}></img>
                        </div>
                        <div className={styles.NextImageButton} onClick={NextImageButton}>
                            <div className={styles.Bar1}></div>
                            <div className={styles.Bar2}></div>
                        </div>
                    </div>
                    <div className={styles.Link}>
                        <label className={styles.LabelName}>{props.discipline.name || 'Disciplina'}</label>
                        <label className={styles.LabelDescription}>{props.discipline.description || 'Descrição'}</label>
                        <label className={styles.LabelLength}>{props.discipline.length || 'Tamanho'}</label>
                    </div>
                </fieldset>
            </div>
        )
    }
}
