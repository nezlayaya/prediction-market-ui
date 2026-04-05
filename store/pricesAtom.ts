import {atom} from "jotai";
import type {PriceUpdate} from "@/types";

const priceAtomsMap = new Map<string, ReturnType<typeof atom<number>>>();

export function getPriceAtom(outcomeId: string) {
    if (!priceAtomsMap.has(outcomeId)) {
        priceAtomsMap.set(outcomeId, atom<number>(0));
    }
    return priceAtomsMap.get(outcomeId)!;
}

// Write-only atom that applies a batch of price updates.
// Receives an array of updates and distributes them across the map.
export const applyPriceUpdatesAtom = atom(
    null,
    (get, set, updates: PriceUpdate[]) => {
        updates.forEach((update) => {
            set(getPriceAtom(update.outcomeId), update.price);
        });
    }
);