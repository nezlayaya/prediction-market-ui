"use client";

import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { eventsAtom, eventsLoadingAtom, selectedCategoryAtom } from "@/store/eventsAtom";
import { useEvents } from "@/hooks/useEvents";
import { useLivePrices } from "@/hooks/useLivePrices";
import EventGrid from "@/components/events/EventGrid";
import styles from "./page.module.css";

export default function CryptoPage() {
  useEvents();
  useLivePrices();

  const setCategory = useSetAtom(selectedCategoryAtom);
  const events = useAtomValue(eventsAtom);
  const isLoading = useAtomValue(eventsLoadingAtom);

  const cryptoEvents = events.filter((event) => event.tags.includes("crypto"));

  useEffect(() => {
    setCategory("crypto");
  }, [setCategory]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Crypto Markets</h1>
        <p className={styles.subtitle}>
          Prediction markets for cryptocurrency events
        </p>
      </div>
      {!isLoading && cryptoEvents.length === 0 ? (
        <p className={styles.empty}>No crypto markets available.</p>
      ) : (
        <EventGrid events={cryptoEvents} isLoading={isLoading} />
      )}
    </div>
  );
}