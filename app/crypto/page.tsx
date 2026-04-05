"use client";

import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { eventsAtom, eventsLoadingAtom, selectedCategoryAtom } from "@/store/eventsAtom";
import EventGrid from "@/components/events/EventGrid";

export default function CryptoPage() {
  const setCategory = useSetAtom(selectedCategoryAtom);
  const events = useAtomValue(eventsAtom);
  const isLoading = useAtomValue(eventsLoadingAtom);

  const cryptoEvents = events.filter((event) => event.tags.includes("crypto"));

  useEffect(() => {
    setCategory("crypto");
  }, [setCategory]);

  return <EventGrid events={cryptoEvents} isLoading={isLoading} />;
}