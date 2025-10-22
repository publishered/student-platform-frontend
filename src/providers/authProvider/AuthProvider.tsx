
import { CircularProgress } from "@mui/material"
import { useEffect, useState, type ReactNode } from "react"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { useLazyGetMeQuery } from "../../api/userApi"
import useAppSelector from "../../store/hooks"
import { login } from "../../store/slices/userSlice"
import { USER_ROLE } from "../../types"

type AuthProvider = {
   children: ReactNode
}

const AuthProvider = ({children}: AuthProvider) => {
   const [getMe] = useLazyGetMeQuery()
   const user = useAppSelector(state => state.user)
   const dispatch = useDispatch()

   const {pathname} = useLocation()
   const navigate = useNavigate()

   const [isLoading, setIsLoading] = useState(true)
   
   async function refreshTokensFn() {
      try {
         const user = await getMe().unwrap()
         dispatch(login(user))
         if (pathname === "/login") {
            navigate('/')
         }
      } catch (err) {
         if (pathname !== "/login") {
            navigate('/login')
         }
      }
      setIsLoading(false)
   }

   useEffect(() => {
      if (user.role === USER_ROLE.GUEST) {
         refreshTokensFn()
      } else {
         setIsLoading(false)
      }
   }, [user.accessToken])

   if (isLoading) {
      return <CircularProgress />
   }

   return <>{children}</>
}

export default AuthProvider