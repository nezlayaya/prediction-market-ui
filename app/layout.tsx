import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "jotai";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
    title: "Polymarket — Prediction Markets",
    description: "Browse and track prediction markets for crypto, sports, and politics.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <Navbar />
                    {children}
                </Provider>
            </body>
        </html>
    );
}