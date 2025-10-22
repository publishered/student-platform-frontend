import CoursesEditList from "../components/courses/editList/EditList"
import Layout from "../components/layout/Layout"
import RoleProvider from "../providers/roleProvider/RoleProvider"
import { USER_ROLE } from "../types"

const EditCoursesPage = () => {
   return <RoleProvider
      allowedRoles={[USER_ROLE.TEACHER, USER_ROLE.ADMIN]}
   > 
      <Layout>
         <CoursesEditList />
      </Layout>
   </RoleProvider>
}

export default EditCoursesPage