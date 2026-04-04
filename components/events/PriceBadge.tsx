"use client";

import { memo, useEffect, useRef, useState } from "react";
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

  const previousPrice = useRef(price);
  const [flash, setFlash] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    if (price > previousPrice.current) {
      setFlash("up");
    } else if (price < previousPrice.current) {
      setFlash("down");
    }
    previousPrice.current = price;
  }, [price]);

  useEffect(() => {
    if (flash === null) return;
    const timer = setTimeout(() => setFlash(null), 600);
    return () => clearTimeout(timer);
  }, [flash]);

  const pctClass = [
    styles.badgePct,
    flash === "up" ? styles.priceUp : flash === "down" ? styles.priceDown : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.badge}>
      <div className={styles.badgeRow}>
        <span className={styles.badgeLabel}>{label}</span>
        <span className={pctClass}>{pct}%</span>
      </div>
      <div className={styles.barTrack}>
        <div className={styles.barFill} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default memo(PriceBadge);