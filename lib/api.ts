import type {Event, Market, Outcome} from "@/types";

const BASE_URL = typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"
    : ""; // on client — use relative URL

// ---------- Raw API shapes (what Polymarket actually returns) ----------

interface RawToken {
    token_id: string;
    outcome: string;
    price: string; // "0.73"
}

interface RawMarket {
    id: string;
    question: string;
    tokens: RawToken[];
    volume: string; // "1234567.89"
}

interface RawEvent {
    id: string;
    slug: string;
    title: string;
    description?: string;
    image?: string;
    volume: string;
    tags?: Array<{ label: string }>;
    markets: RawMarket[];
    endDate?: string;
}

// ---------- Normalizers ----------

function normalizeOutcome(token: RawToken): Outcome {
    return {
        id: token.token_id,
        title: token.outcome,
        price: parseFloat(token.price) || 0,
    };
}

function normalizeMarket(raw: RawMarket): Market {
    return {
        id: raw.id,
        question: raw.question,
        outcomes: (raw.tokens ?? []).map(normalizeOutcome),
        volume: parseFloat(raw.volume) || 0,
    };
}

export function normalizeEvent(raw: RawEvent): Event {
    return {
        id: raw.id,
        slug: raw.slug,
        title: raw.title,
        description: raw.description,
        image: raw.image,
        volume: parseFloat(raw.volume) || 0,
        tags: (raw.tags ?? []).map((t) => t.label.toLowerCase()),
        markets: (raw.markets ?? []).map(normalizeMarket),
        endDate: raw.endDate,
    };
}

// ---------- Fetch helpers ----------

export async function fetchEvents(): Promise<Event[]> {
    const res = await fetch(`${BASE_URL}/api/events`);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
}

export async function fetchEventBySlug(slug: string): Promise<Event | null> {
    const res = await fetch(
        `${BASE_URL}/api/events/${slug}`
    );

    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`API error: ${res.status}`);

    return res.json();
}