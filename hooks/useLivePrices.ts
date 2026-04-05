import {useEffect, useRef} from "react";
import {useAtomValue, useSetAtom} from "jotai";
import {eventsAtom} from "@/store/eventsAtom";
import {applyPriceUpdatesAtom} from "@/store/pricesAtom";
import type {PriceUpdate} from "@/types";

// Simulates a price change of ±0–3%
function simulatePriceChange(currentPrice: number): number {
    const delta = (Math.random() - 0.5) * 0.06;
    return Math.min(0.99, Math.max(0.01, currentPrice + delta));
}

export function useLivePrices() {
    const events = useAtomValue(eventsAtom);
    const applyUpdates = useSetAtom(applyPriceUpdatesAtom);
    const livePrices = useRef<Map<string, number>>(new Map());

    useEffect(() => {
        if (events.length === 0) return;

        // Seed price atoms and local tracker with initial values
        const seed: PriceUpdate[] = [];
        events.forEach((event) => {
            event.markets.forEach((market) => {
                market.outcomes.forEach((outcome) => {
                    if (!livePrices.current.has(outcome.id)) {
                        livePrices.current.set(outcome.id, outcome.price);
                    }
                    seed.push({
                        marketId: market.id,
                        outcomeId: outcome.id,
                        price: livePrices.current.get(outcome.id)!,
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
                            const current = livePrices.current.get(outcome.id) ?? outcome.price;
                            const newPrice = simulatePriceChange(current);
                            livePrices.current.set(outcome.id, newPrice);
                            updates.push({
                                marketId: market.id,
                                outcomeId: outcome.id,
                                price: newPrice,
                                previousPrice: current,
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