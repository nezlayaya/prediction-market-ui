// Format volume: 1234567 → "$1.2M"
export function formatVolume(vol: number): string {
    if (vol >= 1_000_000) return `$${(vol / 1_000_000).toFixed(1)}M`;
    if (vol >= 1_000) return `$${(vol / 1_000).toFixed(0)}K`;
    return `$${vol.toFixed(0)}`;
}

// Format price as percentage: 0.73 → "73%"
export function formatPrice(price: number): string {
    return `${Math.round(price * 100)}%`;
}