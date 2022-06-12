import { useState } from 'react'
import DefaultHead from '../../components/DefaultHead'
import Header from '../../components/Header'
import InfinityLoading from '../../components/InfinityLoading'
import styles from '../../styles/QuestionCad.module.css'

export default function Create() {
    const [status, setStatus] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('')
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
            var formData = new FormData()
            for (let i = 0; imageFiles && i < imageFiles.length; i++) {
                formData.append('file', imageFiles[i])
            }
            setStatus(true)
            const data: any = { title: title, description, length }
            const formBody = [];
            for (var property in data) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(data[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }

            const encodedBody = formBody.join("&");

            fetch('../api/question/', {
                method: "POST",
                redirect: 'follow',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: encodedBody,
            }).then(res => {
                if (!res.url) window.location.href = res.url
            }).catch(error => {
                console.log(error)
                setStatus(false)
            }).finally(() => {
                setStatus(false)
            });

        } catch (err) {
            console.log(err);
            setStatus(false)

        }
    }
    return (
        <>
            <DefaultHead />
            <Header />
            <InfinityLoading active={status} />
            <section className={styles.Section}>
                <div className={styles.Container}>
                    <form className={styles.Form} style={{ textAlign: 'center' }}>
                        <h2 className={styles.H3}>Criar de Questão</h2>
                        <div className={styles.InputContainer}>
                            <input className={styles.InputText} placeholder="Título da Questão" type="text" value={title} onChange={e => setTitle(e.target.value)}></input>
                        </div>
                        <br/>
                        <div className={styles.InputContainer}>
                            <textarea className={styles.InputTextArea} placeholder="Descrição da Questão" value={description} onChange={e => {
                                const value = e.target.value
                                const concat = value.split('\n')
                                var rowCounter = concat.length;
                                concat.forEach(row => {
                                    console.log((row.length / 83))
                                    row.length > 83 ? rowCounter += ((row.length / 83) | 0) : rowCounter
                                });
                                console.log(rowCounter)
                                if (rowCounter <= 5) setDescription(value)
                            }}></textarea>
                        </div>
                        {/* <div className={styles.InputContainer}>
                            <label>Tamanho</label>
                            <input className={styles.InputText} type="text" value={content} onChange={e => setContent(e.target.value)}></input>
                        </div>
                        <div className={styles.InputContainer}>
                            <label>Imagem da disciplina</label>
                            <input className={styles.InputImage} name='image' type='file' accept='image/*' multiple value={imageInput} onChange={e => handleImageInput(e)}></input>
                        </div> */}
                        <div >
                            <button type="button" onClick={e => handleCreate(e)}>Criar</button>
                        </div>
                    </form>
                </div >
            </section>

        </>
    )
}
