import Link from 'next/link'
import { useState } from 'react'
import Discipline from '../models/discipline'
import styles from '../styles/DisciplineCad.module.css'

type Props = {
    name: string
    description: string
    length: string
    imageFilesName: string[]
}
export default function DisciplineComponent(props: Props | Discipline) {
    const [imageIndex, setImageIndex] = useState(0)
    var image: string[] = []
    if (props.imageFilesName) {
        for (let i = 0; i < props.imageFilesName.length; i++) {
            image.push(window.location.origin + '/api/image/' + props.imageFilesName[i])
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
    // if (image) {
    //     image[imageIndex] = window.location.origin + '/api/image/files/' + image[imageIndex]
    // }
    return (
        <div className={styles.ContainerPreview}>
            <fieldset className={styles.FieldsetPreview}>
                <div className={styles.ImageControlBox}>
                    <div className={styles.PreviousImageButton} onClick={PreviousImageButton}>
                        <div className={styles.Bar1}></div>
                        <div className={styles.Bar2}></div>
                    </div>
                    <div className={styles.ImageContainerPreview}>
                        <img className={styles.ImagePreview} src={image?.[imageIndex] || 'discipline-placeholder.png'}></img>
                    </div>
                    <div className={styles.NextImageButton} onClick={NextImageButton}>
                        <div className={styles.Bar1}></div>
                        <div className={styles.Bar2}></div>
                    </div>
                </div>
                <label className={styles.LabelName}>{props.name || 'Disciplina'}</label>
                <label className={styles.LabelDescription}>{props.description || 'Descrição'}</label>
                <label className={styles.LabelLength}>{props.length || 'Tamanho'}</label>
            </fieldset>
        </div>
    )
}
