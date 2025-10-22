import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AuthPage from './pages/AuthPage'
import CourseFormPage from './pages/CourseFormPage'
import EditCoursesPage from './pages/EditCoursesPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/Profile'
import TeachersPage from './pages/TeachersPage'
import UsersPage from './pages/UsersPage'

const theme = createTheme({
	typography: {
		fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
	},
	palette: {
    primary: {
      main: "#6c5ce7",
      contrastText: "#fff"
    },
    secondary: {
      main: "#00ff00",
    },
  },

	components: {
		MuiInputLabel: {
			styleOverrides: {
				root: {
					fontSize: '1rem',
					color: '#666',
					'&.Mui-focused': {
                  fontSize: '1.2rem',
						color: '#6c5ce7',
					},
               '&.MuiInputLabel-shrink': {
                  fontSize: '1.2rem',
					},
				},
			},
		},
		MuiInput: {
			styleOverrides: {
				underline: {
					'&:before': {
						borderBottomColor: '#aaa',
					},
					'&:after': {
						borderBottomColor: '#6c5ce7',
					},
				},
			},
		},
	},
})

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
         <Routes>
            <Route index element={ <HomePage /> } />
            <Route path='/login' element={ <AuthPage /> } />
            <Route path='/profile' element={ <ProfilePage /> } />
            <Route path='/users' element={ <UsersPage /> } />
            <Route path='/unapproved-teachers' element={ <TeachersPage /> } />
            <Route path='/courses/edit' element={ <EditCoursesPage /> } />
            <Route path='/course/edit/:id' element={ <CourseFormPage /> } />
            <Route path='/course/edit' element={ <CourseFormPage /> } />
         </Routes>
         <ToastContainer 
            theme="colored"
         />
		</ThemeProvider>
	)
}
