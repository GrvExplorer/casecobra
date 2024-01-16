import Image from "next/image";
import styles from "./postcard.module.css";
function Postcard() {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.subContainer}`}>
        <div className={`${styles.imgContainer}`}>
          <Image src="/hero.gif" alt="" fill className={`${styles.img}`} />
        </div>
        <p className={`${styles.date}`}>
          <p>N</p>
          <p>o</p>
          <p>v</p>
          <p>1</p>
          <p>5</p>
          <p>t</p>
          <p>h</p>
        </p>
      </div>
      <div className={`${styles.textContainer}`}>
        <h1 className={`${styles.title}`}>Title</h1>
        <p className={`${styles.desc}`}>Description</p>
        <a href="/blog/hello" className={`${styles.readMore}`}>
          Read More
        </a>
      </div>
    </div>
  );
}

export default Postcard;
