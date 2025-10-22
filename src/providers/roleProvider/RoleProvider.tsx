import { CircularProgress } from "@mui/material"
import { useEffect, useState, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import useAppSelector from "../../store/hooks"
import { USER_ROLE } from "../../types"

type RoleProviderPropsType = {
   allowedRoles: USER_ROLE[]
   children: ReactNode
}

const RoleProvider = ({allowedRoles, children}: RoleProviderPropsType) => {
   const user = useAppSelector(state => state.user)
   const navigate = useNavigate()
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      if (allowedRoles.includes(user.role)) {
         setIsLoading(false)
      } else {
         navigate('/')
      }
   }, [])

   if (isLoading) {
      return <CircularProgress />
   }

   return <>{children}</>
}

export default RoleProvider