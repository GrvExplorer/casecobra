import styles from './about.module.css'
import Image from 'next/image'

function page() {
  return (
    <div>
    <div className={`${styles.imgContainer}`}>
        <Image src='/about.png' alt='about' fill priority />
      </div>
    </div>
  )
}

export default page