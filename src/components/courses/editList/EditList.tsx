import { Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDeleteCourseMutation, useGetAllCoursesQuery } from '../../../api/coursesApi'
import CoursesCard from '../card/Card'
import styles from './EditList.module.css'

const CoursesEditList = () => {
   const {data: courses} = useGetAllCoursesQuery()
   const [deleteUserFn] = useDeleteCourseMutation()

   const navigate = useNavigate()
   
   const deleteCourse = async (id: number) => {
      try {
         await deleteUserFn(id).unwrap()
         toast.success('Курс видалено успішно')
      } catch (error) {
         console.error("Failed to delete course:", error)
      }
   }

   return <section className={styles.courses}>
      <Container>
         <div className={styles.top}>
            <h1 className={styles.title}>Редагувати курси</h1>
            <Button variant='contained' onClick={() => navigate('/course/edit')}>Створити курс</Button>
         </div>
         <div className={styles.inner}>
            {
               courses?.map(({id, title, description, createdAt}) => (
                  <CoursesCard title={title} text={description} dateAdded={createdAt} to={`/course/edit/${id}`} key={id}>
                     <Button variant="contained" color='error' type='button' onClick={() => deleteCourse(id)}>Видалити</Button>
                  </CoursesCard>
               )) 
            }
         </div>
      </Container>
   </section>
}

export default CoursesEditList