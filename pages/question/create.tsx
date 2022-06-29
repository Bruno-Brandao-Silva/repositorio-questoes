import { useState } from 'react'
import InfinityLoading from '../../components/InfinityLoading'
import styles from '../../styles/QuestionCad.module.css'
import { server } from '../../config'
import { GetStaticProps } from 'next'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

const fetcher = async (url: string) => await fetch(url).then(async (res) => {
    if (res.status !== 200) {
    }
    const data = await res.json()
    return data
}).catch((err) => { console.log(err) })

function textareaRowLimiter(e: HTMLTextAreaElement, maxRows: number, setFunction: Function) {
    const value = e.value
    const concat = value.split('\n')
    var rowCounter = concat.length;
    concat.forEach(row => {
        row.length > 83 ? rowCounter += ((row.length / 83) | 0) : rowCounter
    });
    if (rowCounter <= maxRows) setFunction(value)
}

export default function Create({ disciplines }: any) {
    const [statusUseState, setStatusUseState] = useState(false)
    const [discipline, setDiscipline] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [question, setQuestion] = useState('')
    const [resolution, setResolution] = useState('')
    const [answerCorrect, setAnswerCorrect] = useState('')
    const [answerIncorrect1, setAnswerIncorrect1] = useState('')
    const [answerIncorrect2, setAnswerIncorrect2] = useState('')
    const [answerIncorrect3, setAnswerIncorrect3] = useState('')
    const [imageInputQuestion, setImageInputQuestion] = useState("")
    const [imageInputResolution, setImageInputResolution] = useState("")
    const [imageFilesQuestion, setImageFilesQuestion] = useState<FileList>()
    const [imageFilesResolution, setImageFilesResolution] = useState<FileList>()
    const [imageQuestion, setImageQuestion] = useState<string[]>([])
    const [imageResolution, setImageResolution] = useState<string[]>([])
    const {data} = useSWR(`/api/profile/`, fetcher)
    const { data: session, status } = useSession()
    if (status === 'loading') return <InfinityLoading active={true} />
    if (status === 'unauthenticated') return <p>Você precisa estar logado para criar uma questão</p>
    if (session) {
        if (data) {
            if(data.role!=='Professor'){
                return <p>Você precisa estar logado como professor para criar uma questão</p>
            }
        }
    }
    const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>, setInput: Function, setFiles: Function, setImg: Function) => {
        setInput(e.target.value)
        if (e.target.files) {
            setFiles(e.target.files)
            if (e.target.files.length > 0) {
                const temp = []
                for (let i = 0; i < e.target.files.length; i++) {
                    temp.push(URL.createObjectURL(e.target.files[i]))
                }
                setImg(temp);
            }
        }
    }

    const handleCreate = async (e: any) => {
        if (discipline === '' || title === '' || description === '' || question === '' ||
            resolution === '' || answerCorrect === '' || answerIncorrect1 === '' ||
            answerIncorrect2 === '' || answerIncorrect3 === '') {
            alert('Preencha todos os campos')
        } else {
            try {
                setStatusUseState(true)

                var formData = new FormData()
                for (let i = 0; imageFilesQuestion && i < imageFilesQuestion.length; i++) {
                    formData.append('file', imageFilesQuestion[i])
                }
                const questionImagesResponse = imageFilesResolution?.length! > 0 ? await fetch('../api/image/upload', {
                    method: "POST",
                    body: formData,
                }).then(res => res.json()).catch(error => { throw new Error(error) }) : []
                var formData = new FormData()
                for (let i = 0; imageFilesResolution && i < imageFilesResolution.length; i++) {
                    formData.append('file', imageFilesResolution[i])
                }
                const resolutionImagesResponse = imageFilesResolution?.length! > 0 ? await fetch('../api/image/upload', {
                    method: "POST",
                    body: formData,
                }).then(res => res.json()).catch(error => { throw new Error(error) }) : []
                const imageFilesNameQuestion = questionImagesResponse.files?.map((file: any) => file.filename)
                const imageFilesNameResolution = resolutionImagesResponse.files?.map((file: any) => file.filename)
                const answers = [answerCorrect, answerIncorrect1, answerIncorrect2, answerIncorrect3]
                const data = { discipline, title, description, question, resolution, answers, imageFilesNameQuestion, imageFilesNameResolution }
                fetch('../api/question/', {
                    method: "POST",
                    redirect: 'follow',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                }).then(res => {
                    if (!res.url) window.location.href = res.url
                }).catch(error => {
                    console.log(error)
                    setStatusUseState(false)
                }).finally(() => {
                    setStatusUseState(false)
                });

            } catch (err) {
                console.log(err);
                setStatusUseState(false)
            }
        }
    }

    return (
        <>
            <InfinityLoading active={statusUseState} />
            <section className={styles.Section}>
                <div className={styles.Container}>
                    <form className={styles.Form} style={{ textAlign: 'center' }}>
                        <h2 className={styles.H3}>Criar de Questão</h2>
                        <div className={styles.InputSelector}>
                            <label>Disciplina:</label>
                            <select value={discipline} onChange={e => setDiscipline(e.target.value)}>
                                <option disabled value=''>-Selecione uma Disciplina-</option>
                                {disciplines.map((discipline: any, i: number) => {
                                    return <option key={i} value={discipline._id}>{discipline.name}</option>
                                })}
                            </select>
                        </div>
                        <div className={styles.InputContainer}>
                            <input className={styles.InputText} placeholder="Título da Questão" type="text" value={title} onChange={e => setTitle(e.target.value)}></input>
                        </div>
                        <br />
                        <div className={styles.InputContainer}>
                            <textarea className={styles.InputTextArea} placeholder="Descrição da Questão" value={description} onChange={e => { textareaRowLimiter(e.target, 5, setDescription) }}></textarea>
                        </div>
                        <br />
                        <div className={styles.InputContainer}>
                            <textarea className={styles.InputTextAreaQuestion} placeholder="Questão" value={question} onChange={e => { setQuestion(e.target.value) }}></textarea>
                        </div>
                        <div className={styles.InputContainerImage}>
                            <div className={styles.InputContainer}>
                                <label>Imagens complementar da Questão</label>
                                <input className={styles.InputImage} name='image' type='file' accept='image/*' multiple value={imageInputQuestion} onChange={e => handleImageInput(e, setImageInputQuestion, setImageFilesQuestion, setImageQuestion)}></input>
                            </div>
                            <div>
                                {imageQuestion.map((image: string, i: number) => { return <img key={i} alt={image} src={image}></img> })}
                            </div>
                        </div>

                        <br />
                        <div className={styles.InputContainer}>
                            <textarea className={styles.InputTextAreaResolution} placeholder="Resolução" value={resolution} onChange={e => { setResolution(e.target.value) }}></textarea>
                        </div>
                        <div className={styles.InputContainerImage}>
                            <div className={styles.InputContainer}>
                                <label>Imagens complementar da Resolução</label>
                                <input className={styles.InputImage} name='image' type='file' accept='image/*' multiple value={imageInputResolution} onChange={e => handleImageInput(e, setImageInputResolution, setImageFilesResolution, setImageResolution)}></input>
                            </div>
                            <div>
                                {imageResolution.map((image: string, i: number) => { return <img key={i} alt={image} src={image}></img> })}
                            </div>
                        </div>
                        <br />
                        <div className={styles.InputContainer}>
                            <textarea className={styles.InputTextAreaAnswers} placeholder="Alternativa Correta" value={answerCorrect} onChange={e => { setAnswerCorrect(e.target.value) }}></textarea>
                        </div>
                        <br />
                        <div className={styles.InputContainer}>
                            <textarea className={styles.InputTextAreaAnswers} placeholder="Alternativas Incorreta" value={answerIncorrect1} onChange={e => { setAnswerIncorrect1(e.target.value) }}></textarea>
                        </div>
                        <br />
                        <div className={styles.InputContainer}>
                            <textarea className={styles.InputTextAreaAnswers} placeholder="Alternativas Incorreta" value={answerIncorrect2} onChange={e => { setAnswerIncorrect2(e.target.value) }}></textarea>
                        </div>
                        <br />
                        <div className={styles.InputContainer}>
                            <textarea className={styles.InputTextAreaAnswers} placeholder="Alternativas Incorreta" value={answerIncorrect3} onChange={e => { setAnswerIncorrect3(e.target.value) }}></textarea>
                        </div>

                        <div >
                            <button type="button" onClick={e => handleCreate(e)}>Criar</button>
                        </div>
                    </form>
                </div >
            </section>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const data = await fetch(`${server}/api/discipline/`).then((res) => res.json())
    return {
        props: {
            disciplines: data,
        },
        revalidate: 10,
    }
}
