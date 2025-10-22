import { Container } from '@mui/material'
import { TypeAnimation } from 'react-type-animation'
import useAppSelector from '../../store/hooks'
import Courses from '../courses/Courses'
import styles from './Home.module.css'

const Home = () => {
   const user = useAppSelector((state) => state.user)
   const fullName = `${user.firstName} ${user.lastName}`

   return <>
      <section className={styles.home}>
         <Container>
            <div className={styles.inner}>
               <div className={styles.info}>
                  <h1 className={styles.title}>Вітаю, 
                     <TypeAnimation
                        sequence={[
                           ` ${fullName}!`,
                        ]}
                        wrapper="span"
                        cursor={true}
                        repeat={0}
                        speed={1}
                        key={fullName}
                     />
                  </h1>
                  <p className={styles.subtitle}>
                     Освітня платформа у розробці. Незабаром тут з’являться курси, матеріали та інструменти для навчання.
                  </p>
               </div>
            </div>
         </Container>
      </section>
      <Courses />
   </>
}

export default Home