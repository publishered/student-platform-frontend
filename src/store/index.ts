import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { coursesApi } from '../api/coursesApi'
import { userApi } from '../api/userApi'
import userSlice from './slices/userSlice'

const reducer = combineReducers({
	user: userSlice.reducer,
	[userApi.reducerPath]: userApi.reducer,
	[coursesApi.reducerPath]: coursesApi.reducer,
})

const middlewares = [
	userApi.middleware,
   coursesApi.middleware,
]

export const store = () =>
	configureStore({
		reducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat(middlewares),
	})

export type RootState = ReturnType<typeof reducer>
