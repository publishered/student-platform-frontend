import { Container } from '@mui/material'
import { useGetAllCoursesQuery } from '../../api/coursesApi'
import styles from './Courses.module.css'
import CoursesCard from './card/Card'
import CoursesNoCourses from './noCourse/NoCourse'

const Courses = () => {
   const {data: courses} = useGetAllCoursesQuery()

   return <section className={styles.courses}>
      <Container>
         <h2 className={styles.title}>Курси</h2>
            {
               courses 
               ?  <div className={styles.inner}>
                  {
                     courses?.map(({id, title, description, createdAt}) => (
                        <CoursesCard title={title} text={description} dateAdded={createdAt} to={`/courses/${id}`} key={id} />
                     )) 
                  }
               </div>
               : <CoursesNoCourses />
            }
      </Container>
   </section>
}

export default Courses