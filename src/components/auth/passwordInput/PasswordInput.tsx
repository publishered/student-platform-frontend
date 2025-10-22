import { Lock, Visibility, VisibilityOff } from '@mui/icons-material'
import { FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, type InputProps } from '@mui/material'
import { useState, type ReactNode } from 'react'
import styles from './PasswordInput.module.css'

type PasswordInputProps =  {
   id: string
   label?: string
   helperText?: ReactNode
} & InputProps

const PasswordInput = ({id, label = "Пароль", error, helperText, ...others}: PasswordInputProps) => {
   const [isShowPassword, setIsShowPassword] = useState(false)

	return (
		<FormControl className={styles.passwordInput}  variant="standard" required> 
			<InputLabel error={error} htmlFor={id}>{label}</InputLabel>
			<Input
            error={error}
            required
				id={id}
				type={isShowPassword ? 'text' : 'password'}
            startAdornment={
               <InputAdornment position="start">
                  <Lock />
               </InputAdornment>
            }
				endAdornment={
					<InputAdornment position='end'>
						<IconButton
							aria-label={
								isShowPassword
									? 'hide the password'
									: 'display the password'
							}
							onClick={() => setIsShowPassword(!isShowPassword)}
							edge='end'
						>
							{isShowPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
            // value={others.value}
            // onChange={others.onChange}
            {...others}
			/>
         {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
		</FormControl>
	)
}

export default PasswordInput
