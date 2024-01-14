import styles from './navbar.module.css'
import Link from 'next/link'
import Links from './links/Links'
// import { auth } from '@/lib/auth'

async function Navbar() {

  return (
    <div className={`${styles.container}`}>
      <Link href='/' className={`${styles.logo}`}>Grv</Link>
      <div>
        <Links />
      </div>
    </div>
  )
}

export default Navbar