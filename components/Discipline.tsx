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
}
export async function getStaticPaths() {
    return {
        fallback: 'blocking'
    }
}
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps(context: any) {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    // const res = await fetch('https://.../posts')
    // const posts = await res.json()

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    const name = context.params.name
    const description = context.params.description
    const length = context.params.length
    const imageFilesName = context.params.imageFilesName
    return {
        props: {
            name: name,
            description: description,
            length: length,
            imageFilesName: imageFilesName
        }
    }
}
// posts will be populated at build time by getStaticProps()
export default function DisciplineComponent(props: Props | Discipline | any) {

    const [imageIndex, setImageIndex] = useState(0)
    var image: string[] = []
    if (props.imageFilesName) {
        for (let i = 0; i < props.imageFilesName.length; i++) {
            if (props.isPreview) {
                image.push(props.imageFilesName[i])
            } else {
                // const { data, error } = useSWR('/api/image/' + props.imageFilesName[i], fetcher)
                // console.log(data)
                // console.log(error)
                image.push(window.location.origin + '/api/image/' + props.imageFilesName[i])
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
