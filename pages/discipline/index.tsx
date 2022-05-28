import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'
import DefaultHead from '../../components/DefaultHead'
import DisciplineComponent from '../../components/Discipline'
import Header from '../../components/Header'
import InfinityLoading from '../../components/InfinityLoading'
import styles from '../../styles/DisciplineCad.module.css'

export default function Create() {
    const [status, setStatus] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [length, setLength] = useState('')
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
            fetch('api/image/upload', {
                method: "POST",
                body: formData,
            }).then(res => res.json())
                .then(res => {
                    if (res.files) setImage(res.files[0].host + res.files[0].filename)
                    console.log(res.files)
                    const data: any = { name, description, length }
                    const formBody = [];
                    for (var property in data) {
                        var encodedKey = encodeURIComponent(property);
                        var encodedValue = encodeURIComponent(data[property]);
                        formBody.push(encodedKey + "=" + encodedValue);
                    }
                    for (let i = 0; res.files && i < res.files.length; i++) {
                        var encodedKey = encodeURIComponent('imageFilesName');
                        var encodedValue = encodeURIComponent(res.files[i].filename);
                        formBody.push(encodedKey + "=" + encodedValue);
                    }
                    const encodedBody = formBody.join("&");

                    fetch('api/discipline/', {
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
                    });
                }).catch(error => {
                    console.log(error)
                    setStatus(false)
                }).finally(() => setStatus(false));
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
                        <h2 className={styles.H3}>Cadastro de Disciplina</h2>

                        <div className={styles.InputContainer}>
                            <label>Nome</label>
                            <input className={styles.InputText} name="name" type="text" value={name} onChange={e => setName(e.target.value)}></input>
                        </div>
                        <div className={styles.InputContainer}>
                            <label>Descrição</label>
                            <input className={styles.InputText} name="description" type="text" value={description} onChange={e => setDescription(e.target.value)}></input>
                        </div>
                        <div className={styles.InputContainer}>
                            <label>Tamanho</label>
                            <input className={styles.InputText} name="length" type="text" value={length} onChange={e => setLength(e.target.value)}></input>
                        </div>
                        <div className={styles.InputContainer}>
                            <label>Imagem da disciplina</label>
                            <input className={styles.InputImage} name='image' type='file' accept='image/*' multiple value={imageInput} onChange={e => handleImageInput(e)}></input>
                        </div>
                        <div >
                            <button type="button" onClick={e => handleCreate(e)}>Criar</button>
                        </div>
                    </form>
                    <DisciplineComponent name={name} description={description} length={length} imageFilesName={image} />
                </div >
            </section>
        </>
    )
}
