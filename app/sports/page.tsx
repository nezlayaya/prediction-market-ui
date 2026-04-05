"use client";

import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { eventsAtom, eventsLoadingAtom, selectedCategoryAtom } from "@/store/eventsAtom";
import { useEvents } from "@/hooks/useEvents";
import { useLivePrices } from "@/hooks/useLivePrices";
import EventGrid from "@/components/events/EventGrid";
import styles from "./page.module.css";

export default function SportsPage() {
  useEvents();
  useLivePrices();

  const setCategory = useSetAtom(selectedCategoryAtom);
  const events = useAtomValue(eventsAtom);
  const isLoading = useAtomValue(eventsLoadingAtom);

  const sportsEvents = events.filter((event) => event.tags.includes("sports"));

  useEffect(() => {
    setCategory("sports");
  }, [setCategory]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Sports Markets</h1>
        <p className={styles.subtitle}>
          Prediction markets for sports events
        </p>
      </div>
      {!isLoading && sportsEvents.length === 0 ? (
        <p className={styles.empty}>No sports markets available.</p>
      ) : (
        <EventGrid events={sportsEvents} isLoading={isLoading} />
      )}
    </div>
  );
}