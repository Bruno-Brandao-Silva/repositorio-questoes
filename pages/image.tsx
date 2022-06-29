import type { GetStaticProps, NextPage } from 'next'
import DefaultHead from '../components/DefaultHead'
import Header from '../components/Header'
import { server } from '../config'
import styles from '../styles/Image.module.css'

const ImagePage: NextPage = ({ data }: any) => {
    const page: any = []
    var images: any = []
    data.map((img: any, index: number) => {
        images.push(<img key={index} alt={img.name} src={img.url} />)
        if (index % 2 === 0 && index !== 0) {
            page.push(<div key={index} className={styles.Page}>{images}</div>)
            images = []
        }
    })
    if (images.length > 0) {
        page.push(<div key={data.length} className={styles.Page}>{images}</div>)
    }
    return (<>
        <h1>Imagens</h1>
        <div className={styles.ImageContainer}>
            {page}
        </div>
    </>)
}

export default ImagePage

export const getStaticProps: GetStaticProps = async () => {
    const data = await fetch(`${server}/api/image/`).then((res) => res.json())
    return {
        props: {
            data: data,
        }, 
        revalidate: 10
    }
}