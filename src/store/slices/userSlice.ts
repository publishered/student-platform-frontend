import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { USER_ROLE, type User } from '../../types'

const initialState: User = {
   accessToken: "",
   id: "",
   email: "",
   role: USER_ROLE.GUEST,
   isApproved: false,
   firstName: "",
   lastName: "",
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login(state, action: PayloadAction<Omit<User, 'accessToken'>>) {
         state.id = action.payload.id
         state.email = action.payload.email
         state.role = action.payload.role
         state.isApproved = action.payload.isApproved
         state.firstName = action.payload.firstName
         state.lastName = action.payload.lastName
		},
      updateAccessToken(state, action: PayloadAction<string>) {
         state.accessToken = action.payload
      },
      updateUserNames(state, action: PayloadAction<{firstName: string, lastName: string}>) {
         state.firstName = action.payload.firstName
         state.lastName = action.payload.lastName
      },
      logout() {
         return initialState
      }
	},
})

export const { 
   login,
   updateAccessToken,
   logout,
   updateUserNames,
} = userSlice.actions
export default userSlice
