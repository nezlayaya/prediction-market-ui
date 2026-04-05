import { NextResponse } from "next/server";
import { normalizeEvent } from "@/lib/api";
import { mockEvents } from "@/lib/mockData";

const GAMMA_URL = "https://gamma-api.polymarket.com";

export async function GET() {
    try {
        // Try the real Polymarket API first
        const res = await fetch(
            `${GAMMA_URL}/events?closed=false&limit=50`,
            { next: { revalidate: 60 } }
        );
        if (!res.ok) throw new Error(`Gamma API error: ${res.status}`);

        const data = await res.json();
        // Normalize raw Gamma API response to our Event[] shape
        const events = Array.isArray(data) ? data.map(normalizeEvent) : [];
        return NextResponse.json(events);
    } catch {
        // Gamma API is currently unavailable — fall back to mock data
        // that mirrors the real API response structure
        return NextResponse.json(mockEvents);
    }
}