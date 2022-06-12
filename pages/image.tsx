import type { NextPage } from 'next'
import useSWR from 'swr'
import DefaultHead from '../components/DefaultHead'
import Header from '../components/Header'
import InfinityLoading from '../components/InfinityLoading'
import styles from '../styles/Image.module.css'

const fetcher = async (url: string) => await fetch(url).then((res) => res.json())

const ImagePage: NextPage = () => {
    const { data, error } = useSWR('/api/image', fetcher)
    if (error) {
        console.log(error)
        return <div>Failed to load</div>
    }
    if (!data) {
        return <InfinityLoading active={true} />
    }
    const page: any = []
    var images: any = []
    data.map((img: any, index: number) => {
        images.push(<img key={index} alt={img.name} src={img.url} />)
        if(index % 2 === 0 && index !== 0) {
            page.push(<div key={index} className={styles.Page}>{images}</div>)
            images = []
        }
    })
    if(images.length > 0) {
        page.push(<div key={data.length} className={styles.Page}>{images}</div>)
    }
    return (<>
        <DefaultHead />
        <Header />
        <h1>Imagens</h1>
        <div className={styles.ImageContainer}>
            {page}
        </div>
    </>)
}

export default ImagePage