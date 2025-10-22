import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../http'

type Course = {
   id: number,
   title: string,
   description?: string,
   createdBy: string,
   createdAt: string,
}

export const coursesApi = createApi({
	reducerPath: 'coursesApi',
	baseQuery: baseQueryWithReauth,
   tagTypes: ['Courses'],
	endpoints: builder => ({
      getAllCourses: builder.query<Course[], void>({
			query: () => '/courses',
         providesTags: ['Courses']
		}),
      getCourseById: builder.query<Course, number>({
         query: (id) => `/courses/${id}`,
      }),
      createCourse: builder.mutation<Course, Omit<Course, "id" | "createdBy" | "createdAt">>({
			query: (newCourse) => ({
				url: `/courses/create`,
				method: 'POST',
				body: newCourse,
			}),
         invalidatesTags: ['Courses']
		}),
      deleteCourse: builder.mutation<void, number>({
         query: (id) => ({
            url: `/courses/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Courses']
      }),
      updateCourse: builder.mutation<Course, {id: number, data: Partial<Omit<Course, "id" | "createdBy" | "createdAt">>}>({
         query: ({id, data}) => ({
            url: `/courses/${id}`,
            method: 'PUT',
            body: data,
         }),
         invalidatesTags: ['Courses']
      }),
	}),
})

export const {
   useGetAllCoursesQuery,
   useGetCourseByIdQuery,
   useCreateCourseMutation,
   useDeleteCourseMutation,
   useUpdateCourseMutation,
} = coursesApi
