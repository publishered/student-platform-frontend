import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useUpdateUserNamesMutation } from '../../../api/userApi'
import { updateUserNames } from '../../../store/slices/userSlice'
import styles from './Form.module.css'

const formInitialState = {
	firstName: '',
	lastName: '',
}

const ProfileForm = () => {
	const [form, setForm] = useState(formInitialState)

	const [errors, setErrors] = useState<Record<string, string>>({})
	const [isLoading, setIsLoading] = useState(false)

   const dispatch = useDispatch()
	const [updateUserNamesReq] = useUpdateUserNamesMutation()

	const validators: Record<keyof typeof form, (value: any) => string> = {
		firstName: v =>
			!v.trim()
				? "Ім'я є обов'язковим"
				: v.length < 2
				? "Ім'я має щонайменше 2 символи"
				: '',
		lastName: v =>
			!v.trim()
				? 'Прізвище є обовʼязковим'
				: v.length < 2
				? 'Щонайменше 2 символи'
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
			await updateUserNamesReq(form).unwrap()
         dispatch(updateUserNames({firstName: form.firstName, lastName: form.lastName}))
         toast.success('Імʼя та прізвище оновлено успішно')
         setForm(formInitialState)
		} catch (err) {
			console.log(err)
		}
		setIsLoading(false)
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div className={styles.inputs}>
				<TextField
					required
					label="Ім'я"
					variant='standard'
					onChange={event => handleChange('firstName', event.target.value)}
					value={form.firstName}
					error={!!errors.firstName}
					helperText={errors.firstName}
					onBlur={() => validateField('firstName')}
				/>
				<TextField
					required
					label='Прізвище'
					variant='standard'
					onChange={event => handleChange('lastName', event.target.value)}
					value={form.lastName}
					error={!!errors.lastName}
					helperText={errors.lastName}
					onBlur={() => validateField('lastName')}
				/>
			</div>
         <Button loading={isLoading} variant="contained" type='submit' disabled={Object.entries(form).some(item => !item[1]) || Object.entries(errors).some(item => item[1])}>Змінити</Button>
		</form>
	)
}

export default ProfileForm
