export interface Outcome {
    id: string;
    title: string;
    price: number;
}

// A market = one question with multiple outcomes
export interface Market {
    id: string;
    question: string;
    outcomes: Outcome[];
    volume: number;
}

// An event = one topic that can have multiple markets
export interface Event {
    id: string;
    slug: string;
    title: string;
    description?: string;
    image?: string;
    volume: number;
    tags: string[]; // e.g. ["crypto", "sports", "politics"]
    markets: Market[];
    endDate?: string;
}

// For live price updates coming from WS or polling
export interface PriceUpdate {
    marketId: string;
    outcomeId: string;
    price: number;
    previousPrice?: number;
}

export type Category = "all" | "crypto" | "sports" | "politics";