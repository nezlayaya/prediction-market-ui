"use client";

import {useAtom} from "jotai";
import Link from "next/link";
import {useRouter, usePathname} from "next/navigation";
import {selectedCategoryAtom} from "@/store/eventsAtom";
import type {Category} from "@/types";
import styles from "./Navbar.module.css";

const CATEGORY_ROUTES: Record<Category, string> = {
    all: "/",
    crypto: "/crypto",
    sports: "/sports",
    politics: "/",
};

const categories: { label: string; value: Category }[] = [
    {label: "All", value: "all"},
    {label: "Crypto", value: "crypto"},
    {label: "Sports", value: "sports"},
    {label: "Politics", value: "politics"},
];

export default function Navbar() {
    const [selected, setSelected] = useAtom(selectedCategoryAtom);
    const router = useRouter();
    const pathname = usePathname();

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link href="/" className={styles.logo}>
                    Polymarket
                </Link>
                <div className={styles.categories}>
                    {categories.map(({label, value}) => (
                        <button
                            key={value}
                            className={`${styles.pill} ${selected === value ? styles.active : ""}`}
                            onClick={() => {
                                setSelected(value);
                                const target = CATEGORY_ROUTES[value];
                                if (pathname !== target) router.push(target);
                            }}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </nav>
        </header>
    );
}