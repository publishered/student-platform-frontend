import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../http'
import type { User } from '../types'

type LoginData = {
   email: string
   password: string
}

type UserForRegister = LoginData & {
   firstName: string
   lastName: string
   role?: string 
}

type SearchUser = {
	id: string
	email: string
	role: 'student' | 'teacher' | 'admin' | "moderator"
	firstName: string
	lastName: string
	isApproved: boolean
	createdAt: string
}

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: baseQueryWithReauth,
   tagTypes: ['Users', 'UnapprovedTeachers', 'Me'],
	endpoints: builder => ({
		refreshTokens: builder.query<{accessToken: string}, void>({
			query: () => '/auth/refresh',
		}),
      getMe: builder.query<User, void>({
			query: () => '/users/me',
         providesTags: ['Me']
		}),
		login: builder.mutation<User, LoginData>({
			query: ({email, password}) => ({
				url: '/auth/login',
				method: 'POST',
				body: {
               email,
               password
            },
			}),
		}),
      logout: builder.mutation<void, void>({
			query: () => ({
				url: '/auth/logout',
				method: 'POST',
				body: {},
			}),
		}),
      register: builder.mutation<{accessToken: string}, UserForRegister>({
         query: (user) => ({
            url: '/auth/register',
            method: 'POST',
            body: user,
         }),
      }),
      searchUsers: builder.query<SearchUser[], string>({
			query: (search) => '/users/search' + `${search ? `?query=${search}` : ''}`,
         providesTags: ['Users']
		}),
      delete: builder.mutation<void, string>({
         query: (id) => ({
            url: `/users/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Users']
      }),
      getUnapprovedTeachers: builder.query<SearchUser[], void>({
         query: () => '/users/pending-teachers',
         providesTags: ['UnapprovedTeachers']
      }),
      approveTeacher: builder.mutation<void, string>({
         query: (id) => ({
            url: `/users/${id}/approve`,
            method: 'PATCH',
         }),
         invalidatesTags: ['UnapprovedTeachers']
      }),
      updateUserNames: builder.mutation<User, {firstName: string, lastName: string}>({
         query: ({firstName, lastName}) => ({
            url: '/users/names',
            method: 'PATCH',
            body: {firstName,  lastName},
         }),
         invalidatesTags: ['Me']
      }),
	}),
})

export const {
   useLoginMutation,
   useLogoutMutation,
   useLazyRefreshTokensQuery,
   useRegisterMutation,
   useLazyGetMeQuery,
   useSearchUsersQuery,
   useDeleteMutation,
   useGetUnapprovedTeachersQuery,
   useApproveTeacherMutation,
   useUpdateUserNamesMutation,
} = userApi
