import {memo} from "react";
import type {Event} from "@/types";
import EventCard from "./EventCard";
import SkeletonCard from "@/components/ui/SkeletonCard";
import styles from "./EventGrid.module.css";

interface EventGridProps {
    events: Event[];
    isLoading: boolean;
}

function EventGrid({events, isLoading}: EventGridProps) {

    if (isLoading) {
        return (
            <div className={styles.grid}>
                {Array.from({length: 6}, (_, i) => (
                    <SkeletonCard key={i}/>
                ))}
            </div>
        );
    }

    if (events.length === 0) {
        return (
            <div className={styles.grid}>
                <p className={styles.empty}>No events found.</p>
            </div>
        );
    }

    return (
        <div className={styles.grid}>
            {events.map((event) => (
                <EventCard key={event.id} event={event}/>
            ))}
        </div>
    );
}

export default memo(EventGrid);