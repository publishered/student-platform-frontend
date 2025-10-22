import EmailIcon from '@mui/icons-material/Email'
import { Button, FormControlLabel, FormHelperText, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../../../api/userApi'
import { isApiError } from '../../../http/isApiError'
import { updateAccessToken } from '../../../store/slices/userSlice'
import PasswordInput from '../passwordInput/PasswordInput'
import styles from './Register.module.css'

const formInitialState = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: '',
	role: 'student',
}

const Register = () => {
   const [form, setForm] = useState(formInitialState)

   const [formError, setFormError] = useState("")
   const [errors, setErrors] = useState<Record<string, string>>({})
	const [isLoading, setIsLoading] = useState(false)

   const [registerRequest] = useRegisterMutation()
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const validators: Record<
		keyof typeof form,
		(value: any) => string
	> = {
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
		email: v =>
			!v.trim()
				? 'Електронна адреса є обовʼязковою'
				: !/\S+@\S+\.\S+/.test(v)
				? 'Невірний формат'
				: '',
		password: v =>
			!v
				? 'Пароль є обовʼязковим'
				: v.length < 6
				? 'Мінімум 6 символів'
				: '',
		confirmPassword: v =>
			!v
				? 'Підтвердіть пароль'
				: v !== form.password
				? 'Паролі не збігаються'
				: '',
		role: () => ''
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

      const { confirmPassword, ...registerData } = form

		try {
         const {accessToken} = await registerRequest(registerData).unwrap()
         dispatch(updateAccessToken(accessToken))
         navigate('/')
      } catch (err) {
         const typedError = err as FetchBaseQueryError
         if ('status' in typedError) {
            if (typedError.status === 409) {
               setFormError("Користувач з такою електронною адресою вже існує.")
            } else if (typedError.status === 403) {
               setFormError("Ви зареєструвалися, однак ваш акаунт очікує на підтвердження адміністратором.")
               setForm(formInitialState)
            } else {
               setFormError(isApiError(typedError) && typedError.data?.message as string || 'Сталася помилка. Спробуйте ще раз.')
            }
         }
      }
      setIsLoading(false)
	}

   return <form className={styles.login} onSubmit={handleSubmit}>
      {formError && <FormHelperText className={styles.error} error={true}>{formError}</FormHelperText>}
      <div className={styles.inputs}>
         <div className={styles.topInputs}>
            <TextField 
               required
               label="Ім'я" 
               variant="standard"
               onChange={(event) => handleChange('firstName', event.target.value)}
               value={form.firstName}
               error={!!errors.firstName}
               helperText={errors.firstName}
               onBlur={() => validateField('firstName')}
            />
            <TextField 
               required
               label="Прізвище" 
               variant="standard"
               onChange={(event) => handleChange('lastName', event.target.value)}
               value={form.lastName}
               error={!!errors.lastName}
               helperText={errors.lastName}
               onBlur={() => validateField('lastName')}
            />
         </div>
         <TextField 
            required
            label="Електронна пошта" 
            variant="standard"
            onChange={(event) => handleChange('email', event.target.value)}
            value={form.email}
            error={!!errors.email}
            helperText={errors.email}
            onBlur={() => validateField('email')}
            slotProps={{
               input: {
                  startAdornment: (
                  <InputAdornment position="start">
                     <EmailIcon />
                  </InputAdornment>
                  ),
               },
            }}
         />
         <PasswordInput 
            label='Створіть пароль'
            id="register-password"
            onChange={(event) => handleChange("password", event.target.value)}
            value={form.password}
            error={!!errors.password}
            helperText={errors.password}
            onBlur={() => validateField('password')}
         />
         <PasswordInput 
            label='Повторіть пароль'
            id="register-confirm-password"
            onChange={(event) => handleChange("confirmPassword", event.target.value)}
            value={form.confirmPassword}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            onBlur={() => validateField('confirmPassword')}
         />
         <div className={styles.roleSelect}>
            <p className={styles.roleSelectText}>Я реєструюся як:</p>
            <RadioGroup
               row
               name="role"
               className={styles.roleOptions}
               value={form.role}
               onChange={(e) => handleChange('role', e.target.value)}
            >
               <FormControlLabel className={styles.roleOption} value="student" control={<Radio />} label="Студент" />
               <FormControlLabel className={styles.roleOption} value="teacher" control={<Radio />} label="Викладач" />
            </RadioGroup>
         </div>
      </div>
      <Button loading={isLoading} variant="contained" type='submit' disabled={Object.entries(form).some(item => !item[1]) || Object.entries(errors).some(item => item[1])}>Зареєструватись</Button>
   </form>
}

export default Register