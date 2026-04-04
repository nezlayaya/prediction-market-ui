"use client";

import { memo } from "react";
import Link from "next/link";
import { formatVolume } from "@/lib/utils";
import type { Event } from "@/types";
import PriceBadge from "./PriceBadge";
import styles from "./EventCard.module.css";

function EventCard({ event }: { event: Event }) {
  const firstMarket = event.markets[0];
  const outcomes = firstMarket?.outcomes.slice(0, 2) ?? [];

  return (
    <Link href={`/event/${event.slug}`} className={styles.card}>
      <div className={styles.imageWrap}>
          <div className={styles.placeholder} />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{event.title}</h3>
        <div className={styles.outcomes}>
          {outcomes.map((o) => (
            <PriceBadge
              key={o.id}
              outcomeId={o.id}
              label={o.title}
              initialPrice={o.price}
            />
          ))}
        </div>
        <div className={styles.footer}>
          <span className={styles.volume}>{formatVolume(event.volume)} Vol.</span>
        </div>
      </div>
    </Link>
  );
}

export default memo(EventCard);