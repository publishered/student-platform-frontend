import { AccountCircle, Email } from '@mui/icons-material'
import useAppSelector from '../../../store/hooks'
import styles from './Info.module.css'

const ProfileInfo = () => {
   const user = useAppSelector((state) => state.user)

	return (
		<div className={styles.info}>
			<ul className={styles.list}>
				<li className={styles.listItem}>
					<Email className={styles.icon} />
					Електронна пошта: <span>{user.email}</span>
				</li>
				<li className={styles.listItem}>
					<AccountCircle className={styles.icon} />
					Ім'я та прізвище: <span>{user.firstName} {user.lastName}</span>
				</li>
			</ul>
		</div>
	)
}

export default ProfileInfo
