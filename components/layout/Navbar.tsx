"use client";

import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { selectedCategoryAtom } from "@/store/eventsAtom";
import type { Category } from "@/types";
import styles from "./Navbar.module.css";

const categories: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Crypto", value: "crypto" },
  { label: "Sports", value: "sports" },
  { label: "Politics", value: "politics" },
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
          {categories.map(({ label, value }) => (
            <button
              key={value}
              className={`${styles.pill} ${selected === value ? styles.active : ""}`}
              onClick={() => {
                if (value === "crypto") {
                  setSelected(value);
                  router.push("/crypto");
                } else if (value === "sports") {
                  setSelected(value);
                  router.push("/sports");
                } else {
                  setSelected(value);
                  if (pathname !== "/") router.push("/");
                }
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