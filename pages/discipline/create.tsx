import { useState } from 'react'
import DisciplineComponent from '../../components/Discipline'
import InfinityLoading from '../../components/InfinityLoading'
import styles from '../../styles/DisciplineCad.module.css'

export default function Create() {
    const [status, setStatus] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [imageInput, setImageInput] = useState("")
    const [imageFiles, setImageFiles] = useState<FileList>()
    const [image, setImage] = useState<string[]>([])

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
            setStatus(true)
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
            }).catch(error => { throw new Error(error) }).finally(() => { setStatus(false) })
        } catch (err) {
            console.log(err);
            setStatus(false)
        }
    }
    return (
        <>
            <InfinityLoading active={status} />
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
