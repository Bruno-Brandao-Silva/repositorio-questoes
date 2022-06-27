import { NextComponentType } from "next";
import Link from "next/link";
import styles from "../styles/AccountInfo.module.css"
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = async (url: string) => await fetch(url).then(async (res) => {
    const dataTemp = await res.json()
    const data = dataTemp[0]
    if (res.status !== 200) {
        return 404
    }
    return data
}).catch((err) => { return err })

const AccountInfo: NextComponentType = () => {
    const router = useRouter()
    const { data: session, status } = useSession()
    const user: any = session?.user
    const { data, error } = useSWR(() => user.email && `/api/profile/${user.email}`, fetcher)
    if (data && router.asPath !== "/profile") {
        if (data === 404) { router.push('/profile') }
    }
    if (session && status === "authenticated") {
        return (
            <>
                <div className={styles.AccountInfo}>
                    <div>
                        <img className={styles.ProfileImg} alt="Profile" src={session?.user?.image!}></img>
                    </div>
                    <div className={styles.AccountBtn}>
                        <Link href='/perfil'><a className={styles.RegisterBtn}>Perfil</a></Link>
                        <div className={styles.SeparatorBar} >|</div>
                        <a className={styles.LoginBtn} onClick={() => signOut()}>Sair</a>
                    </div>
                    <div style={{ position: "fixed", bottom: 0, right: 15 + 'px' }}>
                        Conectado como {JSON.stringify(session?.user)}
                    </div>
                </div>
            </>
        )
    } else if (!session || status === "unauthenticated" || status === "loading") {
        return (
            <div className={styles.AccountInfo}>
                <div>
                    <img className={styles.ProfileImg} alt={'Profile'} src="/profile-placeholder.png" onClick={() => signIn("auth0")}></img>
                </div>
                <div className={styles.AccountBtn}>
                    <a className={styles.LoginBtn} onClick={() => signIn("auth0", null!, { prompt: "login" })}>Entrar</a>
                </div>

            </div >
        )
    } else { return (<></>) }
}
export default AccountInfo