import Layout from "../components/layout/Layout"
import Container from "../components/UI/container/Container"
import Users from "../components/users/Users"
import RoleProvider from "../providers/roleProvider/RoleProvider"
import { USER_ROLE } from "../types"

const UsersPage = () => {
   return <RoleProvider
      allowedRoles={[USER_ROLE.ADMIN]}
   >
      <Layout>
         <Container>
            <Users />
         </Container>
      </Layout>
   </RoleProvider> 
}

export default UsersPage