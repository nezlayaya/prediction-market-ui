import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { eventsAtom, eventsLoadingAtom, eventsErrorAtom } from "@/store/eventsAtom";
import { fetchEvents } from "@/lib/api";

export function useEvents() {
    const events = useAtomValue(eventsAtom);
    const setEvents = useSetAtom(eventsAtom);
    const setLoading = useSetAtom(eventsLoadingAtom);
    const setError = useSetAtom(eventsErrorAtom);

    useEffect(() => {
        if (events.length > 0) return;

        let cancelled = false; // guard against race conditions
        async function load() {
            try {
                setLoading(true);
                setError(null);

                const data = await fetchEvents();
                // If the component unmounted while data was loading — skip state update
                if (!cancelled) {
                    setEvents(data);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : "Failed to fetch events");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        load();

        // Cleanup: if the component has unmounted — cancel the write
        return () => {
            cancelled = true;
        };
    }, []); // [] = runs once on mount
}