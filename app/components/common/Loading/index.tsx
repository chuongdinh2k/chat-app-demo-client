"use client";
import styles from "./styles.module.scss";

export default function LoadingComponent() {
  return (
    <div className={styles.loadingComponent}>
      <div className={styles.loadingComponent__one}></div>
      <div className={styles.loadingComponent__two}></div>
      <div className={styles.loadingComponent__three}></div>
      <div className={styles.loadingComponent__four}></div>
      <div className={styles.loadingComponent__five}></div>
    </div>
  );
}
