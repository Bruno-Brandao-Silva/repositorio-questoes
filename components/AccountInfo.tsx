import { NextComponentType } from "next";
import Link from "next/link";
import styles from "../styles/AccountInfo.module.css"
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0"

const AccountInfo: NextComponentType = () => {
    const { user, isLoading } = useUser()
    if (user && !isLoading) {
        return (
            <>
                <div className={styles.AccountInfo}>
                    <div>
                        <img className={styles.ProfileImg} alt="Profile" src={user.picture!}></img>
                    </div>
                    <div className={styles.AccountBtn}>
                        <Link href='/perfil'><a className={styles.RegisterBtn}>Perfil</a></Link>
                        <div className={styles.SeparatorBar} >|</div>
                        <a className={styles.LoginBtn} href="/api/auth/logout">Sair</a>
                    </div>
                    <div style={{ position: "fixed", bottom: 0, right: 15 + 'px' }}>

                        Conectado como {JSON.stringify(user)}

                    </div>
                </div>
            </>
        )
    } else if (!user || isLoading) {
        return (
            <div className={styles.AccountInfo}>
                <div>
                    <img className={styles.ProfileImg} alt={'Profile'} src="/profile-placeholder.png" onClick={() => { }}></img>
                </div>
                <div className={styles.AccountBtn}>
                    <a href="/api/auth/login" className={styles.LoginBtn} onClick={() => { }}>Entrar</a>
                </div>

            </div >
        )
    } else { return (<></>) }
}
export default AccountInfo