import AccountInfo from './AccountInfo'
import styles from '../styles/Header.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Header() {
    const { asPath } = useRouter()
    const [searchText, setSearchText] = useState('')
    return (<>
        <header className={styles.Header}>
            <div className={styles.UpperSideHeader}>
                <Link href="/"><a className={styles.LogoA} ><img className={styles.LogoIcon} src="/logo.png" alt="Logo"></img></a></Link>
                <form action='/api/discipline/search' method='get' className={styles.SearchContainer}>
                    <input type="text" name='name' placeholder="Search" value={searchText} onChange={e => {
                        setSearchText(e.target.value);
                    }} className={styles.SearchInput}></input>
                    <button type='submit' className={styles.SearchBtn}><img className={styles.SearchIcon} src='/lupa-icon.svg' alt="Search Icon"></img></button>
                </form>
                <AccountInfo />
            </div>
            <div className={styles.NavBar}>
                <div className={styles.NavBarTr}>
                    <Link href="/discipline/"><a className={styles.NavBarUl + ' ' + (asPath === '/discipline' ? styles.ActiveLink : '')}>Disciplinas</a></Link>
                    <Link href="/question/"><a className={styles.NavBarUl + ' ' + (asPath === '/question' ? styles.ActiveLink : '')}>Questões</a></Link>
                    {/* <Link href="/image/"><a className={styles.NavBarUl + ' ' + (asPath === '/image' ? styles.ActiveLink : '')}>Imagens</a></Link> */}
                    <Link href="/discipline/create"><a className={styles.NavBarUl + ' ' + (asPath === '/discipline/create' ? styles.ActiveLink : '')}>Criar Disciplina</a></Link>
                    <Link href="/question/create"><a className={styles.NavBarUl + ' ' + (asPath === '/question/create' ? styles.ActiveLink : '')}>Criar Questão</a></Link>
                </div>
            </div>
        </header>
    </>)
}