import { Search } from '@mui/icons-material'
import { Button, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useDeleteMutation, useSearchUsersQuery } from '../../api/userApi'
import UsersCard from './card/Card'
import styles from './Users.module.css'

const Users = () => {
   const [searchQuery, setSearchQuery] = useState("")
   const {data: users} = useSearchUsersQuery(searchQuery) 

   const [deleteUserFn] = useDeleteMutation()

   const deleteUser = async (id: string) => {
      try {
         await deleteUserFn(id).unwrap()
         toast.success('Користувача видалено успішно')
      } catch (error) {
         console.error("Failed to delete user:", error)
      }
   }

   return <section className={styles.users}>
      <h1 className={styles.title}>Користувачі</h1>
      <div className={styles.search}>
         <TextField 
            required
            label="Пошук користувачів" 
            variant="standard"
            slotProps={{
               input: {
                  startAdornment: (
                  <InputAdornment position="start">
                     <Search />
                  </InputAdornment>
                  ),
               },
            }}
            value={searchQuery}
            onChange={e => {setSearchQuery(e.target.value)}}
         />
      </div>
      <div className={styles.list}>
         {users?.map(({id, firstName, lastName, email, role}) => (
            <UsersCard key={id} name={`${firstName} ${lastName}`} email={email} role={role}>
               <Button variant="contained" color='error' type='button' onClick={() => deleteUser(id)}>Видалити</Button>
            </UsersCard>
         ))}
      </div>
   </section>
}

export default Users