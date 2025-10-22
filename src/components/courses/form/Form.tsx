import DescriptionIcon from '@mui/icons-material/Description'
import TitleIcon from '@mui/icons-material/Title'
import { Button, InputAdornment, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCreateCourseMutation, useGetCourseByIdQuery, useUpdateCourseMutation } from '../../../api/coursesApi'
import Container from '../../UI/container/Container'
import styles from './Form.module.css'

const formInitialState = {
	title: '',
	description: '',
}

const CoursesForm = () => {
	const [form, setForm] = useState(formInitialState)

	const [errors, setErrors] = useState<Record<string, string>>({})
	const [isLoading, setIsLoading] = useState(false)

	const [createCourseReq] = useCreateCourseMutation()
	const [updateCourseReq] = useUpdateCourseMutation()

   const { id } = useParams()
	const courseId = Number(id)

   const navigate = useNavigate()

   const {data: course} = useGetCourseByIdQuery(courseId, { skip: !id, refetchOnMountOrArgChange: true })

   useEffect(() => {
      if (course) {
         setForm({
            title: course.title,
            description: course.description || '',
         })
      }
   }, [course])

	const validators: Record<keyof typeof form, (value: any) => string> = {
		title: v =>
			!v.trim()
				? "Назва є обов'язковою"
				: v.length < 3
				? "Назва має щонайменше 3 символи"
				: '',
		description: v =>
			!v.trim()
				? ''
				: v.length < 2
				? 'Опис має щонайменше 3 символи'
				: '',
	}

	const validateField = (field: keyof typeof validators) => {
		const value = form[field as keyof typeof form]
		const error = validators[field]?.(value) || ''
		setErrors(prev => ({ ...prev, [field]: error }))
	}

	const handleChange = (field: keyof typeof form, value: string) => {
		setForm(prev => ({ ...prev, [field]: value }))
	}

	const validateForm = () => {
		const newErrors: Record<string, string> = {}

		;(Object.keys(validators) as (keyof typeof validators)[]).forEach(
			field => {
				const value = form[field as keyof typeof form]
				const error = validators[field](value)
				if (error) newErrors[field] = error
			}
		)

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!validateForm()) return

		setIsLoading(true)

		try {
         if (id) {
            await updateCourseReq({id: courseId, data: form}).unwrap()
         } else {
            await createCourseReq(form).unwrap()
         }
         toast.success(`Курс створено успішно ${id ? 'оновлено' : 'створено' }`)
         navigate('/courses/edit')
		} catch (err) {
			console.log(err)
		}
		setIsLoading(false)
	}

	return (
      <section className={styles.formContainer}>
         <Container>
            <h1 className={styles.title}>{ id ? 'Редагувати курс' : 'Створити курс' }</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
               <div className={styles.inputs}>
                  <TextField
                     required
                     label='Назва курсу'
                     variant='standard'
                     slotProps={{
                        input: {
                           startAdornment: (
                              <InputAdornment position='start'>
                                 <TitleIcon />
                              </InputAdornment>
                           ),
                        },
                     }}
                     value={form.title}
                     onChange={e => handleChange('title', e.target.value)}
                     error={!!errors.title}
                     helperText={errors.title}
                     onBlur={() => validateField('title')}
                  />
                  <TextField
                     required
                     label='Опис курсу'
                     variant='standard'
                     slotProps={{
                        input: {
                           startAdornment: (
                              <InputAdornment position='start'>
                                 <DescriptionIcon />
                              </InputAdornment>
                           ),
                        },
                     }}
                     value={form.description}
                     onChange={e => handleChange('description', e.target.value)}
                     error={!!errors.description}
                     helperText={errors.description}
                     onBlur={() => validateField('description')}
                  />
               </div>
               <Button loading={isLoading} variant='contained' type='submit'>
                  { id ? 'Оновити курс' : 'Створити курс' }
               </Button>
            </form>
         </Container>
      </section>
	)
}

export default CoursesForm
