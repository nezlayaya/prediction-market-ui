import type {Event} from "@/types";

export const mockEvents: Event[] = [
    {
        id: "1",
        slug: "will-btc-hit-100k-2025",
        title: "Will Bitcoin exceed $100,000 before end of 2025?",
        description: "This market resolves YES if Bitcoin's price exceeds $100,000 on any major exchange before December 31, 2025.",
        volume: 4820000,
        tags: ["crypto"],
        endDate: "2025-12-31",
        markets: [
            {
                id: "m1",
                question: "Will Bitcoin exceed $100,000 before end of 2025?",
                volume: 4820000,
                outcomes: [
                    {id: "o1", title: "Yes", price: 0.72},
                    {id: "o2", title: "No", price: 0.28},
                ],
            },
        ],
    },
    {
        id: "2",
        slug: "us-recession-2025",
        title: "Will the US enter a recession in 2025?",
        description: "Resolves YES if the NBER officially declares a US recession with start date in 2025.",
        volume: 3100000,
        tags: ["politics"],
        endDate: "2025-12-31",
        markets: [
            {
                id: "m2",
                question: "Will the US enter a recession in 2025?",
                volume: 3100000,
                outcomes: [
                    {id: "o3", title: "Yes", price: 0.41},
                    {id: "o4", title: "No", price: 0.59},
                ],
            },
        ],
    },
    {
        id: "3",
        slug: "fed-rate-cuts-2025",
        title: "How many Fed rate cuts in 2025?",
        description: "How many times will the Federal Reserve cut interest rates in 2025?",
        volume: 2750000,
        tags: ["politics"],
        endDate: "2025-12-31",
        markets: [
            {
                id: "m3",
                question: "Number of Fed rate cuts in 2025",
                volume: 2750000,
                outcomes: [
                    {id: "o5", title: "0", price: 0.12},
                    {id: "o6", title: "1", price: 0.31},
                    {id: "o7", title: "2", price: 0.34},
                    {id: "o8", title: "3+", price: 0.23},
                ],
            },
        ],
    },
    {
        id: "4",
        slug: "nba-championship-2025",
        title: "Who will win the 2025 NBA Championship?",
        description: "Which team will win the 2024-25 NBA Championship?",
        volume: 1980000,
        tags: ["sports"],
        endDate: "2025-06-30",
        markets: [
            {
                id: "m4",
                question: "Who will win the 2025 NBA Championship?",
                volume: 1980000,
                outcomes: [
                    {id: "o9", title: "Boston Celtics", price: 0.28},
                    {id: "o10", title: "Oklahoma City Thunder", price: 0.22},
                    {id: "o11", title: "Cleveland Cavaliers", price: 0.15},
                    {id: "o12", title: "Golden State Warriors", price: 0.11},
                ],
            },
        ],
    },
    {
        id: "5",
        slug: "eth-price-2025",
        title: "Will Ethereum exceed $5,000 in 2025?",
        description: "Resolves YES if ETH/USD price exceeds $5,000 on any major exchange before December 31, 2025.",
        volume: 2340000,
        tags: ["crypto"],
        endDate: "2025-12-31",
        markets: [
            {
                id: "m5",
                question: "Will Ethereum exceed $5,000 in 2025?",
                volume: 2340000,
                outcomes: [
                    {id: "o13", title: "Yes", price: 0.55},
                    {id: "o14", title: "No", price: 0.45},
                ],
            },
        ],
    },
    {
        id: "6",
        slug: "super-bowl-lix-winner",
        title: "Super Bowl LIX Winner",
        description: "Which team will win Super Bowl LIX?",
        volume: 5600000,
        tags: ["sports"],
        endDate: "2025-02-09",
        markets: [
            {
                id: "m6",
                question: "Super Bowl LIX Winner",
                volume: 5600000,
                outcomes: [
                    {id: "o15", title: "Philadelphia Eagles", price: 0.52},
                    {id: "o16", title: "Kansas City Chiefs", price: 0.48},
                ],
            },
        ],
    },
    {
        id: "7",
        slug: "trump-approval-50-2025",
        title: "Will Trump's approval rating exceed 50% in 2025?",
        description: "Resolves YES if any major poll shows Trump approval above 50% in 2025.",
        volume: 1450000,
        tags: ["politics"],
        endDate: "2025-12-31",
        markets: [
            {
                id: "m7",
                question: "Will Trump's approval rating exceed 50%?",
                volume: 1450000,
                outcomes: [
                    {id: "o17", title: "Yes", price: 0.33},
                    {id: "o18", title: "No", price: 0.67},
                ],
            },
        ],
    },
    {
        id: "8",
        slug: "solana-price-500-2025",
        title: "Will Solana reach $500 in 2025?",
        description: "Resolves YES if SOL/USD price reaches $500 on any major exchange before December 31, 2025.",
        volume: 1870000,
        tags: ["crypto"],
        endDate: "2025-12-31",
        markets: [
            {
                id: "m8",
                question: "Will Solana reach $500 in 2025?",
                volume: 1870000,
                outcomes: [
                    {id: "o19", title: "Yes", price: 0.48},
                    {id: "o20", title: "No", price: 0.52},
                ],
            },
        ],
    },
    {
        id: "9",
        slug: "wimbledon-2025-winner",
        title: "Wimbledon 2025 Men's Singles Winner",
        description: "Who will win the Wimbledon 2025 Men's Singles Championship?",
        volume: 980000,
        tags: ["sports"],
        endDate: "2025-07-13",
        markets: [
            {
                id: "m9",
                question: "Wimbledon 2025 Men's Singles Winner",
                volume: 980000,
                outcomes: [
                    {id: "o21", title: "Carlos Alcaraz", price: 0.35},
                    {id: "o22", title: "Novak Djokovic", price: 0.25},
                    {id: "o23", title: "Jannik Sinner", price: 0.22},
                    {id: "o24", title: "Other", price: 0.18},
                ],
            },
        ],
    },
    {
        id: "10",
        slug: "us-unemployment-5-2025",
        title: "Will US unemployment exceed 5% in 2025?",
        description: "Resolves YES if the US unemployment rate exceeds 5% in any monthly BLS report in 2025.",
        volume: 760000,
        tags: ["politics"],
        endDate: "2025-12-31",
        markets: [
            {
                id: "m10",
                question: "Will US unemployment exceed 5% in 2025?",
                volume: 760000,
                outcomes: [
                    {id: "o25", title: "Yes", price: 0.29},
                    {id: "o26", title: "No", price: 0.71},
                ],
            },
        ],
    },
    {
        id: "11",
        slug: "champions-league-2025-winner",
        title: "UEFA Champions League 2024/25 Winner",
        description: "Which club will win the UEFA Champions League 2024/25 season?",
        volume: 2100000,
        tags: ["sports"],
        endDate: "2025-05-31",
        markets: [
            {
                id: "m11",
                question: "UEFA Champions League 2024/25 Winner",
                volume: 2100000,
                outcomes: [
                    {id: "o27", title: "Real Madrid", price: 0.24},
                    {id: "o28", title: "Manchester City", price: 0.19},
                    {id: "o29", title: "Bayern Munich", price: 0.16},
                    {id: "o30", title: "Other", price: 0.41},
                ],
            },
        ],
    },
    {
        id: "12",
        slug: "xrp-price-5-2025",
        title: "Will XRP reach $5 in 2025?",
        description: "Resolves YES if XRP/USD price reaches $5 on any major exchange before December 31, 2025.",
        volume: 1230000,
        tags: ["crypto"],
        endDate: "2025-12-31",
        markets: [
            {
                id: "m12",
                question: "Will XRP reach $5 in 2025?",
                volume: 1230000,
                outcomes: [
                    {id: "o31", title: "Yes", price: 0.44},
                    {id: "o32", title: "No", price: 0.56},
                ],
            },
        ],
    },
];