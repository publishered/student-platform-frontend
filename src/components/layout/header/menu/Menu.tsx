import { Link } from 'react-router-dom'
import useAppSelector from '../../../../store/hooks'
import { USER_ROLE } from '../../../../types'
import styles from './Menu.module.css'

type MenuItem = { to: string; label: string }

const HeaderMenu = () => {
   const user = useAppSelector(state => state.user)

   const menu: Partial<Record<USER_ROLE, MenuItem[]>> = {
      [USER_ROLE.STUDENT]: [
         {to: '/', label: 'Головна'},
      ],
      [USER_ROLE.TEACHER]: [
         {to: '/', label: 'Головна'},
         {to: '/courses/edit', label: 'Управління курсами'},
      ],
      [USER_ROLE.ADMIN]: [
         {to: '/', label: 'Головна'},
         {to: '/courses/edit', label: 'Управління курсами'},
         {to: '/users', label: 'Управління користувачами'},
         {to: '/unapproved-teachers', label: 'Управління викладачами'},
      ],
      [USER_ROLE.GUEST]: [],
   }

   return <nav className={styles.menu}>
      <ul className={styles.list}>
         {
            (menu[user.role] ?? []).map((item) => (
               <li key={item.to} className={styles.item}>
                  <Link className={styles.link} to={item.to}>{item.label}</Link>
               </li>
            ))
         }
      </ul>
   </nav>
}

export default HeaderMenu