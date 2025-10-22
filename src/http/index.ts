import type {
   BaseQueryFn,
   FetchArgs,
   FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type { RootState } from '../store'
import { logout, updateAccessToken } from '../store/slices/userSlice'

type RefreshResponse = {
   message: string,
   accessToken?: string,
   refreshToken?: string
}
 
const baseQuery = fetchBaseQuery({
   baseUrl: import.meta.env.VITE_API_URL,
   prepareHeaders: async (headers, { getState }) => {
      const { user } = getState() as RootState
      if (user?.accessToken) {
         headers.set('Authorization', `Bearer ${user.accessToken}`)
         return headers
      }
   },
   credentials: "include"
})

export const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions)
	if (result.error && result.error.status === 401) {
		const refreshResult = (await baseQuery(import.meta.env.VITE_API_URL_REFRESH!, api, extraOptions))
      const refreshResultData = refreshResult.data as RefreshResponse
      if (!refreshResult?.error && refreshResultData?.accessToken) {
         api.dispatch(updateAccessToken(refreshResultData.accessToken))
         result = await baseQuery(args, api, extraOptions)
      } else {
         api.dispatch(logout())
      }
	}
	return result
}
