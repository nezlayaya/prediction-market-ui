import { memo } from "react";
import styles from "./SkeletonCard.module.css";

function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={styles.image} />
      <div className={styles.body}>
        <div className={styles.titleLine} />
        <div className={styles.titleLineShort} />
        <div className={styles.outcomeRow} />
        <div className={styles.outcomeRow} />
        <div className={styles.volumeLine} />
      </div>
    </div>
  );
}

export default memo(SkeletonCard);