'use client';

import { getDecks } from "@/lib/api/deckApi";
import { useEffect, useState } from "react";

export default function Page() {
    const [decks, setDecks] = useState<string[]>([]);

    useEffect(() => {
        async function fetchData() {
            const decks = await getDecks();
            setDecks(decks);
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1>テスト</h1>
            <ul>
                {decks.map(deck => <li key={deck}>{deck}</li>)}
            </ul>
        </div>
    );
}