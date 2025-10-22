export type User = {
   accessToken: string
   id: string
   email: string
   role: USER_ROLE,
   isApproved: boolean,
   firstName: string,
   lastName: string,
}

export enum USER_ROLE {
   ADMIN = "admin", 
   TEACHER = "teacher",
   STUDENT = "student",
   GUEST = "guest",
}