import { useSession } from 'next-auth/react'
import styles from '../../styles/Perfil.module.css'
import useSWR from 'swr'
import { useState } from 'react'

const fetcher = async (url: string) => await fetch(url).then(async (res) => {
	if (res.status === 404) {
		return res.status
	} else {
		return await res.json().then((data) => data)
	}
}).catch((err) => { console.log(err); throw new Error(err) })

export default function Perfil() {

	const { data: session, status } = useSession()
	const { data } = useSWR(() => `/api/profile`, fetcher,)
	const [name, setName] = useState("")
	const [role, setRole] = useState("")
	const [isAluno, setIsAluno] = useState(false)
	const [isProfessor, setIsProfessor] = useState(false)
	const [loaded, setLoaded] = useState(false)
	console.log(data)
	const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRole(event.target.value);
	};
	console.log(name, role, isAluno, isProfessor)
	if (data && session && status == "authenticated") {
		if (!loaded) {
			if (data === 404) {
				alert('Finalize seu cadastro para acessar as funcionalidades do sistema');
			}
			console.log(data)
			setName(data.name ? data.name : "")
			setRole(data.role ? data.role : "")
			setIsAluno(data.role === "aluno" ? true : false)
			setIsProfessor(data.role === "professor" ? true : false)
			setLoaded(true)
		}
		return (<>
			<div className={styles.Container}>
				<div className={styles.Form}>
					<div className={styles.InputBox}>
						<img className={styles.ProfileImg} alt="Profile" src={session?.user?.image!}></img>
					</div>
					<br></br>
					<div className={styles.InputBox}>
						<label className={styles.Label}>Email</label>
						<label className={styles.InputLabel}>{session?.user?.email}</label>
					</div>
					<br></br>
					<div className={styles.InputBox}>
						<label>Nome Completo</label>
						<input type="text" name='name' placeholder={"Nome Completo"} className={styles.Input} value={name} onChange={e => { setName(e.target.value) }} required ></input>
					</div>
					<br></br>
					<div className={styles.InputBox}>
						<label>Função</label>
						<div style={{ display: 'flex', gap: '1rem', width: '30rem' }}>
							<input type='radio' id='Aluno' name='role' value={'Aluno'} onChange={() => setRole('Aluno')} defaultChecked={isAluno} />
							<label>Aluno</label>
							<br></br>
							<input type='radio' id='Professor' name='role' value={'Professor'} onChange={() => setRole('Professor')} defaultChecked={isProfessor} />
							<label>Professor</label>
							<br></br>
						</div>
					</div>
					<br></br>
					<button type="button" className={styles.SubmitButton} onClick={async () => {
						if (name.length == 0) { alert("Nome inválido"); return }
						if (role.length == 0) { alert("Selecione uma Função"); return }
						const dataBody: any = { email: session?.user?.email, name, role }
						const formBody = []
						for (var property in dataBody) {
							var encodedKey = encodeURIComponent(property);
							var encodedValue = encodeURIComponent(dataBody[property]);
							formBody.push(encodedKey + "=" + encodedValue);
						}
						const encodedBody = formBody.join("&");
						await fetch('/api/profile', {
							method: data.name ? 'PATCH' : 'POST',
							headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
							body: encodedBody
						}).finally(() => { window.location.reload() })
					}}>Salvar</button>
				</div>
			</div>
		</>)
	} else if (!data || status == "loading") {
		return (<>
			<div className={styles.Container}>
				<div className={styles.Form}>

					<div className={styles.InputBox}>
						<img className={styles.ProfileImg} alt="Profile" src={session?.user?.image!}></img>
					</div>
					<br></br>
					<div className={styles.InputBox}>
						<label className={styles.Label}>Email</label>
						<label className={styles.InputLabel}></label>
					</div>
					<br></br>
					<div className={styles.InputBox}>
						<span></span>
						<label>Nome Completo</label>
						<input disabled type="text" className={styles.Input} value={name} onChange={e => { setName(e.target.value) }} required></input>
					</div>
					<div className={styles.InputBox}>
						<label>Função</label>
						<div style={{ display: 'flex', gap: '1rem', width: '30rem' }}>
							<input type='radio' name='role' value={role} onChange={() => setRole('Aluno')} />
							<label>Aluno</label>
							<br></br>
							<input type='radio' name='role' value={role} onChange={() => setRole('Professor')} />
							<label>Professor</label>
							<br></br>
						</div>
					</div>
					<br></br>
					<button disabled type="submit" className={styles.SubmitButton}>Salvar</button>
				</div >
			</div>
		</>)
	} else return <h1>error</h1>
}