import {useEffect, useRef} from "react";
import {useAtomValue, useSetAtom} from "jotai";
import {eventsAtom, eventsLoadingAtom, eventsErrorAtom} from "@/store/eventsAtom";
import {fetchEvents} from "@/lib/api";

export function useEvents() {
    const events = useAtomValue(eventsAtom);
    const setEvents = useSetAtom(eventsAtom);
    const setLoading = useSetAtom(eventsLoadingAtom);
    const setError = useSetAtom(eventsErrorAtom);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (events.length > 0 || hasFetched.current) return;
        hasFetched.current = true;

        let cancelled = false;

        async function load() {
            try {
                setLoading(true);
                setError(null);

                const data = await fetchEvents();
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

        return () => {
            cancelled = true;
        };
    }, [events.length, setEvents, setLoading, setError]);
}