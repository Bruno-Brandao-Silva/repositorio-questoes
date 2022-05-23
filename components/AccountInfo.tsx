import { NextComponentType } from "next";
import Link from "next/link";
import styles from "../styles/AccountInfo.module.css"
const AccountInfo: NextComponentType = () => {
    var status = 'unauthenticated'
    if (status == "authenticated") {
        return (
            <>
                <div className={styles.AccountInfo}>
                    <div>
                        <img className={styles.ProfileImg} alt="Profile" src=''></img>
                    </div>
                    <div className={styles.AccountBtn}>
                        <Link href='/perfil'><a className={styles.RegisterBtn}>Perfil</a></Link>
                        <div className={styles.SeparatorBar} >|</div>
                        <a className={styles.LoginBtn} onClick={() => { }}>Sair</a>
                    </div>
                    <div style={{ position: "fixed", bottom: 0, right: 15 + 'px' }}>

                        Conectado como { }

                    </div>
                </div>
            </>
        )
    } else if (status == "unauthenticated" || "loading") {
        return (
            <div className={styles.AccountInfo}>
                <div>
                    <img className={styles.ProfileImg} alt={'Profile'} src="/profile-placeholder.png" onClick={() => { }}></img>
                </div>
                <div className={styles.AccountBtn}>
                    <a className={styles.LoginBtn} onClick={() => { }}>Entrar</a>
                </div>

            </div >
        )
    } else { return (<></>) }
}
export default AccountInfo