import CoursesForm from "../components/courses/form/Form"
import Layout from "../components/layout/Layout"
import RoleProvider from "../providers/roleProvider/RoleProvider"
import { USER_ROLE } from "../types"

const CourseFormPage = () => {
   return <RoleProvider
      allowedRoles={[USER_ROLE.TEACHER, USER_ROLE.ADMIN]}
   > 
      <Layout>
         <CoursesForm />
      </Layout>
   </RoleProvider>
}

export default CourseFormPage