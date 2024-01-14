import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>GrvExplorer</div>
      <div className={styles.text}>
        GrvExplorer creative thoughts agency © All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
