import Postcard from './postcard/Postcard'
import styles from './postcards.module.css'
function Postcards() {
  return (
    <div className={styles.container}>
      <Postcard />
      <Postcard />
      <Postcard />
      <Postcard />
      <Postcard />
    </div>
  )
}

export default Postcards