import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import styles from './NoCourse.module.css';

const CoursesNoCourses = () => (
	<div className={styles.noCourse}>
		<SentimentVeryDissatisfiedIcon style={{width: '5rem', height: '5rem', color: '#6c5ce7'}} className={styles.icon} />
      <h2 className={styles.title}>Курсів не знайдено</h2>
      <p className={styles.text}>Вас ще не приєднали до жодного курсу.</p>
	</div>
)

export default CoursesNoCourses