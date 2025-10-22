import { Container } from '@mui/material'
import styles from './Profile.module.css'
import ProfileForm from './form/Form'
import ProfileInfo from './info/Info'

const Profile = () => {
   return <section className={styles.profile}>
      <Container>
         <h1 className={styles.title}>Профіль</h1>
         <div className={styles.inner}>
            <ProfileInfo />
            <ProfileForm />
         </div>
      </Container>
   </section>
}

export default Profile