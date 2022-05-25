import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import useSWR from 'swr'
import DefaultHead from '../components/DefaultHead'
import DisciplineComponent from '../components/Discipline'
import Header from '../components/Header'
import InfinityLoading from '../components/InfinityLoading'


const Test: NextPage = () => {
    const [imageInput, setImageInput] = useState("")
    const [imageFiles, setImageFiles] = useState<FileList>()
    const [image, setImage] = useState("")
    return <>
        <img src={image} style={{maxWidth: 500, maxHeight:500}} alt='preview'></img>
        <form>
            <input type='file' accept='image/*' value={imageInput} onChange={e => {
                setImageInput(e.target.value)
                if (e.target.files) {
                    setImageFiles(e.target.files)
                    setImage(URL.createObjectURL(e.target.files[0]));
                }
            }}></input>
            <button type='button' onClick={async () => {
                var formData = new FormData()
                for (let i = 0; imageFiles && i < imageFiles.length; i++) {
                    formData.append('file', imageFiles[i])
                }
                fetch('api/image/upload', {
                    method: "POST",
                    body: formData,
                }).then(res => res.json())
            }}>Enviar</button>
        </form>
    </>
}

export default Test
