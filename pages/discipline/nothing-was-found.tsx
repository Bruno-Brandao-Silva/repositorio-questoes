import Link from "next/link";
import Header from "../../components/Header";

export default function Discipline() {

    return (
        <>
            <Header/>
            <div style={{ textAlign: 'center' }}>
                <h1>Nada foi encontrado</h1>
                <br></br>
                <h2> <Link href="/">---&gt; Home</Link></h2>
            </div>
        </>
    )
}
