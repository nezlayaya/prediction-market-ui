import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { eventsAtom } from "@/store/eventsAtom";
import { applyPriceUpdatesAtom } from "@/store/pricesAtom";
import type { PriceUpdate } from "@/types";

// Simulates a price change of ±0–3%
function simulatePriceChange(currentPrice: number): number {
    const delta = (Math.random() - 0.5) * 0.06;
    return Math.min(0.99, Math.max(0.01, currentPrice + delta));
}

export function useLivePrices() {
    const events = useAtomValue(eventsAtom);
    const applyUpdates = useSetAtom(applyPriceUpdatesAtom);

    useEffect(() => {
        if (events.length === 0) return;

        // Seed price atoms with initial values from events to avoid 0% flash
        const seed: PriceUpdate[] = [];
        events.forEach((event) => {
            event.markets.forEach((market) => {
                market.outcomes.forEach((outcome) => {
                    seed.push({
                        marketId: market.id,
                        outcomeId: outcome.id,
                        price: outcome.price,
                        previousPrice: outcome.price,
                    });
                });
            });
        });
        if (seed.length > 0) {
            applyUpdates(seed);
        }

        const interval = setInterval(() => {
            const updates: PriceUpdate[] = [];

            events.forEach((event) => {
                event.markets.forEach((market) => {
                    market.outcomes.forEach((outcome) => {
                        if (Math.random() < 0.2) {
                            updates.push({
                                marketId: market.id,
                                outcomeId: outcome.id,
                                price: simulatePriceChange(outcome.price),
                                previousPrice: outcome.price,
                            });
                        }
                    });
                });
            });

            if (updates.length > 0) {
                applyUpdates(updates);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [events, applyUpdates]);
}