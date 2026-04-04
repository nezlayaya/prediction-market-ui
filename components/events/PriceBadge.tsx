"use client";

import { memo } from "react";
import { useAtomValue } from "jotai";
import { getPriceAtom } from "@/store/pricesAtom";
import styles from "./EventCard.module.css";

function PriceBadge({
  outcomeId,
  label,
  initialPrice,
}: {
  outcomeId: string;
  label: string;
  initialPrice: number;
}) {
  const livePrice = useAtomValue(getPriceAtom(outcomeId));
  const price = livePrice > 0 ? livePrice : initialPrice;
  const pct = Math.round(price * 100);

  return (
    <div className={styles.badge}>
      <div className={styles.badgeRow}>
        <span className={styles.badgeLabel}>{label}</span>
        <span className={styles.badgePct}>{pct}%</span>
      </div>
      <div className={styles.barTrack}>
        <div className={styles.barFill} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default memo(PriceBadge);