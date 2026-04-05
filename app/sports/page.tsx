"use client";

import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { eventsAtom, eventsLoadingAtom, selectedCategoryAtom } from "@/store/eventsAtom";
import EventGrid from "@/components/events/EventGrid";

export default function SportsPage() {
  const setCategory = useSetAtom(selectedCategoryAtom);
  const events = useAtomValue(eventsAtom);
  const isLoading = useAtomValue(eventsLoadingAtom);

  const sportsEvents = events.filter((event) => event.tags.includes("sports"));

  useEffect(() => {
    setCategory("sports");
  }, [setCategory]);

  return <EventGrid events={sportsEvents} isLoading={isLoading} />;
}