import { NextRequest, NextResponse } from 'next/server';

type res = {
    error: string | null;
    result: string[] | null;
}

/**
 * デッキ一覧を取得
 * @returns デッキ一覧
 */
export async function getDecks() {
    try {
        const action = "deckNames";
        const version = 6;
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({action, version}),
        });
        const data = await response.json() as res;
        const decks = data.result as string[];
        if (decks === null) {
            throw new Error("デッキ一覧の取得に失敗しました");
        }
        return decks;
    } catch (error) {
        console.error(error);
        return [];
    }
}