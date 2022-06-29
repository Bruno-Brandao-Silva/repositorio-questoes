import { useSession } from 'next-auth/react'
import { useState } from 'react'
import useSWR from 'swr'
import DisciplineComponent from '../../components/Discipline'
import InfinityLoading from '../../components/InfinityLoading'
import styles from '../../styles/DisciplineCad.module.css'

const fetcher = async (url: string) => await fetch(url).then(async (res) => {
    if (res.status !== 200) {
    }
    const data = await res.json()
    return data
}).catch((err) => { console.log(err) })

export default function Create() {
    const [statusUseState, setStatusUseState] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [imageInput, setImageInput] = useState("")
    const [imageFiles, setImageFiles] = useState<FileList>()
    const [image, setImage] = useState<string[]>([])
    const { data } = useSWR(`/api/profile/`, fetcher)
    const { data: session, status } = useSession()
    if (status === 'loading') return <InfinityLoading active={true} />
    if (status === 'unauthenticated') return <p>Você precisa estar logado para criar uma disciplina</p>
    if (session) {
        if (data) {
            if (data.role !== 'Professor') {
                return <p>Você precisa estar logado como professor para criar uma disciplina</p>
            }
        }
    }
    const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageInput(e.target.value)
        if (e.target.files) {
            setImageFiles(e.target.files)
            if (e.target.files.length > 0) {
                const temp = []
                for (let i = 0; i < e.target.files.length; i++) {
                    temp.push(URL.createObjectURL(e.target.files[i]))
                }
                setImage(temp);
            } else {
                setImage(['discipline-placeholder.png'])
            }
        }
    }

    const handleCreate = async (e: any) => {
        try {
            setStatusUseState(true)
            var formData = new FormData()
            for (let i = 0; imageFiles && i < imageFiles.length; i++) {
                formData.append('file', imageFiles[i])
            }
            const imageFilesResponse = imageFiles?.length! > 0 ? await fetch('../api/image/upload', {
                method: "POST",
                body: formData,
            }).then(res => res.json()).catch(error => { throw new Error(error) }) : []
            const imageFilesName = imageFilesResponse.files?.map((file: any) => file.filename)
            const data = { name, description, length, imageFilesName }
            fetch('../api/discipline/', {
                method: "POST",
                redirect: 'follow',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            }).then(res => {
                if (!res.url) window.location.href = res.url
            }).catch(error => { throw new Error(error) }).finally(() => { setStatusUseState(false) })
        } catch (err) {
            console.log(err);
            setStatusUseState(false)
        }
    }
    return (
        <>
            <InfinityLoading active={statusUseState} />
            <section className={styles.Section}>
                <div className={styles.Container}>
                    <form className={styles.Form} style={{ textAlign: 'center' }}>
                        <h2 className={styles.H3}>Cadastro de Disciplina</h2>

                        <div className={styles.InputContainer}>
                            <label>Nome</label>
                            <input className={styles.InputText} name="name" type="text" value={name} onChange={e => setName(e.target.value)}></input>
                        </div>
                        <div className={styles.InputContainer}>
                            <label>Descrição</label>
                            <textarea className={styles.InputTextArea} rows={3} name="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className={styles.InputContainer}>
                            <label>Imagem da disciplina</label>
                            <input className={styles.InputImage} name='image' type='file' accept='image/png' value={imageInput} onChange={e => handleImageInput(e)}></input>
                        </div>
                        <div >
                            <button type="button" onClick={e => handleCreate(e)}>Criar</button>
                        </div>
                    </form>
                    <DisciplineComponent discipline={{ name: name, description: description, imageFilesName: image }} isPreview={true} />
                </div >
            </section>
        </>
    )
}
