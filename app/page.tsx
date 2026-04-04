"use client";

import { useAtomValue } from "jotai";
import { useEvents } from "@/hooks/useEvents";
import { useLivePrices } from "@/hooks/useLivePrices";
import { filteredEventsAtom, eventsLoadingAtom, eventsErrorAtom } from "@/store/eventsAtom";
import EventGrid from "@/components/events/EventGrid";

function HomeContent() {
  useEvents();
  useLivePrices();

  const events = useAtomValue(filteredEventsAtom);
  const isLoading = useAtomValue(eventsLoadingAtom);
  const error = useAtomValue(eventsErrorAtom);

  if (error) {
    return (
      <p style={{ textAlign: "center", color: "#ef4444", fontSize: 14 }}>
        {error}
      </p>
    );
  }

  return <EventGrid events={events} isLoading={isLoading} />;
}

export default function Home() {
  return <HomeContent />
}