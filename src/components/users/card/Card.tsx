import { Avatar } from '@mui/material'
import type { ReactNode } from 'react'
import styles from './Card.module.css'

type UsersCardProps = {
   children?: ReactNode,
   name: string
   email: string
   role: string
}

const UsersCard = ({name, email, role, children}: UsersCardProps) => {
   return <div className={styles.card}>
      <div className={styles.inner}>
         <Avatar className={styles.avatar} sx={{ width: 46, height: 46 }}>{name.slice(0, 1)}</Avatar>
         <div className={styles.accountInfo}>
            <span className={styles.accountName}>{name}</span>
            <span className={styles.accountEmail}>{email}</span>
            <span className={styles.role}>Роль: {role}</span>
         </div>
      </div>
      <div className={styles.btns}>
         {children}
      </div>
   </div>
}

export default UsersCard