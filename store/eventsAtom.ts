import { atom } from "jotai";
import type { Event, Category } from "@/types";

// All events loaded from the API
export const eventsAtom = atom<Event[]>([]);

// Loading state
export const eventsLoadingAtom = atom(true);

// Loading error
export const eventsErrorAtom = atom<string | null>(null);

// Selected category
export const selectedCategoryAtom = atom<Category>("all");

// Derived atom — filters events by category
export const filteredEventsAtom = atom((get) => {
    const events = get(eventsAtom);
    const category = get(selectedCategoryAtom);

    if (category === "all") return events;

    return events.filter((event) => event.tags.includes(category));
});