import { GetStaticProps, NextComponentType } from "next";
import Link from "next/link";
import styles from "../styles/AccountInfo.module.css"
import { useSession, signIn, signOut } from "next-auth/react"
import useSWR from "swr";
import { useRouter } from "next/router";
import { server } from "../config";

export default function AccountInfo() {
    const profile = async () => await fetch(`${server}/api/profile/`).then((res) => res.json())
    const router = useRouter()
    const { data: session, status } = useSession()
    // const { data, error } = useSWR( () => session && `/api/profile/`, fetcher )
    //     if (data === 404) { router.push('/profile') }
    // }
    if (session && status === "authenticated") {
        return (
            <>
                <div className={styles.AccountInfo}>
                    <div>
                        <img className={styles.ProfileImg} alt="Profile" src={session?.user?.image!}></img>
                    </div>
                    <div className={styles.AccountBtn}>
                        <Link href='/profile'><a className={styles.RegisterBtn}>Perfil</a></Link>
                        <div className={styles.SeparatorBar} >|</div>
                        <a className={styles.LoginBtn} onClick={() => signOut()}>Sair</a>
                    </div>
                    {/* <div style={{ position: "fixed", bottom: 0, right: 15 + 'px' }}>
                        Conectado como {JSON.stringify(session?.user)}
                    </div> */}
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
    } else { return (<h1>Falha</h1>) }
}
