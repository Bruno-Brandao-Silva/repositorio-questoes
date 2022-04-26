import Link from 'next/link'

export default function Header() {
    return (
        <header style={{ textAlign: 'center' }}>
            <br></br>
            <h1><Link href="/">RepoQuest</Link></h1>
            <br></br>
        </header>
    )
}
