import AccountInfo from './AccountInfo'
import styles from '../styles/Header.module.css'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
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
                    <Link href="/api/discipline/"><a className={styles.NavBarUl}>Disciplinas</a></Link>
                    <Link href="/api/image/"><a className={styles.NavBarUl}>Images</a></Link>
                    <div className={styles.NavBarUl}>Item 3</div>
                    <div className={styles.NavBarUl}>Item 4</div>
                    <div className={styles.NavBarUl}>Item 5</div>
                </div>
            </div>
        </header>
    </>)
}