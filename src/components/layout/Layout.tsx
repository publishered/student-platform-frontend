import type { ReactNode } from 'react'
import styles from './Layout.module.css'
import Header from './header/Header'

type LayoutProps = {
   children: ReactNode
}

const Layout = ({children}: LayoutProps) => {
   return <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
         {children}
      </main>
   </div>
}

export default Layout