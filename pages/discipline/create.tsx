import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Header from '../../components/Header'


const fetcher = async (url: string) => {
    const res = await fetch(url)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
}


export default function Create() {
    return (
        <>
            <Header />
            <div style={{ textAlign: 'center' }}>
                <form method='post' action="/api/disciplines/create" style={{ textAlign: 'center' }}>
                    <p></p>
                    <p></p>
                    <div>
                        <label>Id</label>
                        <br></br>
                        <input id="id" name="id" type="text"></input>
                    </div>
                    <div>
                        <label>Nome</label>
                        <br></br>
                        <input id="name" name="name" type="text"></input>
                    </div>
                    <div>
                        <label>Descrição</label>
                        <br></br>
                        <input id="description" name="description" type="text"></input>
                    </div>
                    <div>
                        <label>Tamanho</label>
                        <br></br>
                        <input id="length" name="length" type="text"></input>
                    </div>
                    <p></p>
                    <div>
                        <button type="submit">Criar</button>
                    </div>
                </form>
                <br></br>
                <b><Link href="/">Home</Link></b>
            </div>

        </>
    )
}
