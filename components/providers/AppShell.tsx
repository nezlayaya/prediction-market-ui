"use client";

import { useEvents } from "@/hooks/useEvents";
import { useLivePrices } from "@/hooks/useLivePrices";

export default function AppShell({ children }: { children: React.ReactNode }) {
  useEvents();
  useLivePrices();
  return <>{children}</>;
}
