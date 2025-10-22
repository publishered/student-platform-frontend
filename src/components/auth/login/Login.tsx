import EmailIcon from '@mui/icons-material/Email'
import { Button, FormHelperText, InputAdornment, TextField } from '@mui/material'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useState, type FormEvent } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../../api/userApi'
import { isApiError } from '../../../http/isApiError'
import { updateAccessToken } from '../../../store/slices/userSlice'
import PasswordInput from '../passwordInput/PasswordInput'
import styles from './Login.module.css'

const Login = () => {
   const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

   const [errors, setErrors] = useState<Record<string, string>>({})
   const [formError, setFormError] = useState("")
	const [isLoading, setIsLoading] = useState(false)

   const [loginRequest] = useLoginMutation()
   const navigate = useNavigate()
   const dispatch = useDispatch()

	const validators = {
		email: (value: string) => {
			if (!value.trim()) return 'Потрібна електронна адреса'
			if (!/\S+@\S+\.\S+/.test(value)) return 'Електронна адреса недійсна'
			return ''
		},
		password: (value: string) => {
			if (!value) return 'Потрібен пароль'
			if (value.length < 6)
				return 'Пароль повинен складатися щонайменше з 6 символів'
			return ''
		},
	}

   const validateField = (field: string, value: string) => {
		const error = validators[field as keyof typeof validators]?.(value) || ''
		setErrors(prev => ({ ...prev, [field]: error }))
	}

   const validateForm = () => {
		const newErrors: Record<string, string> = {}

		Object.entries({ email, password }).forEach(([key, value]) => {
			const error = validators[key as keyof typeof validators]?.(value) || ''
			if (error) newErrors[key] = error
		})

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

   const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		if (!validateForm()) return
		setIsLoading(true)
      try {
         const {accessToken} = await loginRequest({
            email,
            password
         }).unwrap()
         dispatch(updateAccessToken(accessToken))
         navigate('/')
      } catch (err) {
         const typedError = err as FetchBaseQueryError
         console.log(err)
         if ('status' in typedError) {
            if (typedError.status === 401) {
               setFormError("Невірна електронна адреса або пароль.")
            } else if (typedError.status === 403) {
               setFormError("Ви зареєструвалися, однак ваш акаунт очікує на підтвердження адміністратором.")
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
         <TextField 
            required
            label="Електронна пошта" 
            variant="standard"
            slotProps={{
               input: {
                  startAdornment: (
                  <InputAdornment position="start">
                     <EmailIcon />
                  </InputAdornment>
                  ),
               },
            }}
            value={email}
            onChange={e => {setEmail(e.target.value)}}
            error={!!errors.email}
            helperText={errors.email}
            onBlur={() => validateField('email', email)}
         />
         <PasswordInput 
            id="login-password"
            value={password}
            onChange={e => {setPassword(e.target.value)}}
            error={!!errors.password}
            helperText={errors.password}
            onBlur={() => validateField('password', password)}
         />
      </div>
      <Button loading={isLoading} variant="contained" type='submit'>Увійти</Button>
   </form>
}

export default Login