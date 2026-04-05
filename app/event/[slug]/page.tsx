"use client";

/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { useParams, useRouter } from "next/navigation";
import { fetchEventBySlug } from "@/lib/api";
import { formatVolume } from "@/lib/utils";
import { getPriceAtom } from "@/store/pricesAtom";
import type { Event, Market, Outcome } from "@/types";
import styles from "./page.module.css";

// ---- Outcome row with live price ----

function OutcomeRow({ outcome }: { outcome: Outcome }) {
  const livePrice = useAtomValue(getPriceAtom(outcome.id));
  const price = livePrice > 0 ? livePrice : outcome.price;
  const pct = Math.round(price * 100);

  const [flash, setFlash] = useState<"up" | "down" | null>(null);
  const [prevPrice, setPrevPrice] = useState(price);

  useEffect(() => {
    if (price === prevPrice) return;
    setFlash(price > prevPrice ? "up" : "down");
    setPrevPrice(price);
    const timer = setTimeout(() => setFlash(null), 600);
    return () => clearTimeout(timer);
  }, [prevPrice, price]);

  const pctClass = [
    styles.pricePct,
    flash === "up" ? styles.priceUp : flash === "down" ? styles.priceDown : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.outcomeRow}>
      <span className={styles.outcomeName} title={outcome.title}>
        {outcome.title}
      </span>
      <div className={styles.barTrack}>
        <div className={styles.barFill} style={{ width: `${pct}%` }} />
      </div>
      <span className={pctClass}>{pct}%</span>
    </div>
  );
}

// ---- Market card ----

function MarketCard({
  market,
  eventTitle,
}: {
  market: Market;
  eventTitle: string;
}) {
  return (
    <div className={styles.marketCard}>
      {market.question !== eventTitle && (
        <h3 className={styles.marketQuestion}>{market.question}</h3>
      )}
      {market.outcomes.map((outcome) => (
        <OutcomeRow key={outcome.id} outcome={outcome} />
      ))}
    </div>
  );
}

// ---- Loading skeleton ----

function LoadingSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonDesc} />
      <div className={styles.skeletonDesc} style={{ width: "70%" }} />
      <div className={styles.skeletonMarket} />
      <div className={styles.skeletonMarket} />
    </div>
  );
}

// ---- Page component ----

export default function EventDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      const data = await fetchEventBySlug(params.slug);
      if (!cancelled) {
        setEvent(data);
        setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [params.slug]);

  if (isLoading) return <LoadingSkeleton />;

  if (!event) {
    return (
      <div className={styles.container}>
        <p className={styles.notFound}>Event not found.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => router.back()}>
        ← Markets
      </button>
      <h1 className={styles.title}>{event.title}</h1>
      {event.description && (
        <p className={styles.description}>{event.description}</p>
      )}
      <p className={styles.volume}>{formatVolume(event.volume)} Vol.</p>
      {event.markets.map((market) => (
        <MarketCard key={market.id} market={market} eventTitle={event.title} />
      ))}
    </div>
  );
}