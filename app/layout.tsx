import "./globals.css";
import { Provider } from "jotai";
import Navbar from "@/components/layout/Navbar";

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