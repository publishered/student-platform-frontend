import { Button } from '@mui/material'
import { toast } from 'react-toastify'
import { useApproveTeacherMutation, useGetUnapprovedTeachersQuery } from '../../api/userApi'
import UsersCard from '../users/card/Card'
import styles from './Teachers.module.css'

const Teachers = () => {
   const {data: unapprovedTeachers} = useGetUnapprovedTeachersQuery() 
   
   const [approveTeacherFn] = useApproveTeacherMutation()
   
   const approveTeacher = async (id: string) => {
      try {
         await approveTeacherFn(id).unwrap()
         toast.success('Вчителя апрувнуто успішно')
      } catch (error) {
         console.error("Failed to delete user:", error)
      }
   }

	return (
		<section className={styles.teachers}>
			<h1 className={styles.title}>Запити вчителів</h1>
			<div className={styles.list}>
				{unapprovedTeachers?.map(({ id, firstName, lastName, email, role }) => (
					<UsersCard
						key={id}
						name={`${firstName} ${lastName}`}
						email={email}
						role={role}
					>
						<Button
							variant='contained'
							type='button'
							onClick={() => approveTeacher(id)}
						>
							Апрувнути
						</Button>
					</UsersCard>
				))}
			</div>
		</section>
	)
}

export default Teachers
