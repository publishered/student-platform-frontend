import { useState } from 'react'
import styles from './Auth.module.css'
import Login from './login/Login'
import Register from './register/Register'

export default function Auth() {
	const [tab, setTab] = useState<"login" | "register">("login")

	return (
		<div className={styles.auth}>
         <div className={styles.authBg}></div>
			<div className={styles.card}>
            <div className={styles.info}>
               <h1 className={styles.title}>Освітня платформа</h1>
               <p className={styles.text}>Навчайтеся та викладайте з нашою платформою</p>
            </div>
				<div className={`${styles.tabs} ${tab === "login" ? styles.left : styles.right}`}>
               <button className={`${styles.tab} ${tab === "login" ? styles.active : ''}`} onClick={() => setTab("login")}>Увійти</button>
               <button className={`${styles.tab} ${tab === "register" ? styles.active : ''}`} onClick={() => setTab("register")}>Зареєструватись</button>
            </div>
            <div className={styles.formWrapper}>
               { tab === "login" ? <Login /> : <Register />  }
            </div>
			</div>
		</div>
	)
}