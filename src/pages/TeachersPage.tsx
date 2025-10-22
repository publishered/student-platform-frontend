import Layout from "../components/layout/Layout"
import Teachers from "../components/teachers/Teachers"
import Container from "../components/UI/container/Container"
import RoleProvider from "../providers/roleProvider/RoleProvider"
import { USER_ROLE } from "../types"

const TeachersPage = () => {
   return <RoleProvider
      allowedRoles={[USER_ROLE.ADMIN]}
   > 
      <Layout>
         <Container>
            <Teachers />
         </Container>
      </Layout>
   </RoleProvider>
}

export default TeachersPage