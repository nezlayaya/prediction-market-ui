import { NextResponse } from "next/server";
import { mockEvents } from "@/lib/mockData";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const event = mockEvents.find((e) => e.slug === slug);

    if (!event) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
}