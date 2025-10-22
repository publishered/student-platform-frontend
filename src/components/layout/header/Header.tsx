import { AccountCircle, Logout } from '@mui/icons-material'
import { Avatar, Container, ListItemIcon, Menu, MenuItem } from '@mui/material'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../../../api/userApi'
import useAppSelector from '../../../store/hooks'
import { logout } from '../../../store/slices/userSlice'
import styles from './Header.module.css'
import HeaderMenu from './menu/Menu'

const Header = () => {
   const [isOpenAccountMenu, setIsOpenAccountMenu] = useState(false)

   const accountBtnRef = useRef(null)
   const navigate = useNavigate()

   const [logoutRequest] = useLogoutMutation()
   const dispatch = useDispatch()

   const logoutHandle = async () => {
      await logoutRequest().unwrap()
      dispatch(logout())
      navigate('/login')
   }

   const user = useAppSelector((state) => state.user)

   return <header className={styles.header}>
      <Container>
         <div className={styles.inner}>
            <HeaderMenu />
            <button className={styles.account} onClick={() => setIsOpenAccountMenu(prev => !prev)} ref={accountBtnRef}>
               <Avatar sx={{ width: 36, height: 36 }}>{user.firstName.slice(0, 1)}</Avatar>
               <div className={styles.accountInfo}>
                  <span className={styles.accountName}>{user.firstName} {user.lastName}</span>
                  <span className={styles.accountEmail}>{user.email}</span>
               </div>
            </button>
            <Menu
               anchorEl={accountBtnRef.current}
               id="account-menu"
               open={isOpenAccountMenu}
               onClose={() => setIsOpenAccountMenu(false)}
               onClick={() => setIsOpenAccountMenu(false)}
               slotProps={{
                  paper: {
                     elevation: 0,
                     sx: {
                     overflow: 'visible',
                     filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                     mt: 1.5,
                     '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                     },
                     '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        left: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                     },
                     },
                  },
               }}
               transformOrigin={{ horizontal: 'left', vertical: 'top' }}
               anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
               <MenuItem onClick={() => navigate('/profile')}>
                  <ListItemIcon>
                     <AccountCircle fontSize="small" />
                  </ListItemIcon>
                  Профіль
               </MenuItem>
               <MenuItem onClick={() => logoutHandle()}>
                  <ListItemIcon>
                     <Logout fontSize="small" />
                  </ListItemIcon>
                  Вийти
               </MenuItem>
            </Menu>
         </div>
      </Container>
   </header>
}

export default Header