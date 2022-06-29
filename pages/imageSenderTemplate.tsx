import type { NextPage } from 'next'
import { useState } from 'react'

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
