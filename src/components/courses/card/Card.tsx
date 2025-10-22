import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from './Card.module.css'

const formatDate = (dateString: string): string => {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}
	return new Date(dateString).toLocaleDateString(undefined, options)
}

type CoursesCardProps = {
   to: string
   title: string
   text?: string
   dateAdded: string
   children?: ReactNode
}

const CoursesCard = ({to, title, text, dateAdded, children}: CoursesCardProps) => {
   return <div className={styles.card}>
      <Link  to={to}className={styles.link}>
         <h2 className={styles.title}>{title}</h2>
         <div className={styles.body}>
            {text ? <p className={styles.text}>{text}</p> : ''}
            <span className={styles.date}>
               Змінено: {formatDate(dateAdded)}
            </span>
         </div>
      </Link>
      {
         children 
         ? <div className={styles.btns}>{children}</div> 
         : ''
      }
   </div>
}

export default CoursesCard