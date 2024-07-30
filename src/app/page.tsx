'use client';

import { getDecks } from "@/lib/api/deckApi";
import { getNotes } from "@/lib/api/noteApi";
import { useEffect, useState } from "react";
import Link from "next/link";

type note = {
    noteId: string;
    fields: {
        表面: {
            value: string;
            order: number;
        }
        裏面: {
            value: string;
            order: number;
        }
    }   
}

export default function Page() {
    const [decks, setDecks] = useState<string[]>([]);
    const [selectedDeck, setSelectedDeck] = useState<string>('');
    const [notes, setNotes] = useState<note[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // デッキ一覧取得および初期デッキ設定
    useEffect(() => {
        async function fetchData() {
            const decks = await getDecks();
            setDecks(decks);
            setSelectedDeck(decks[0]);
        }
        fetchData();
        setLoading(false);
    }, []);

    // デッキ変更時にノート取得
    useEffect(() => {
        async function fetchNotes() {
            const notes = await getNotes(selectedDeck);
            setNotes(notes);
        }
        fetchNotes();
    }, [selectedDeck]);

    if (loading) {
        return <div>Loading...</div>;
    }
    
    // デッキから選択
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDeck(event.target.value);
    }

    return (
        <div>
            <h2>ノート一覧</h2>
            <Link href="/upload">アップロード</Link>
            {/* デッキ選択 */}
            <div className="p-2 border-t">
                <select name="decks" id="decks" onChange={handleChange} className="p-2 border">
                    {decks.map((deck, index) => (
                        <option key={index} value={deck}>{deck}</option>
                    ))}
                </select>
            </div>
            {notes.length === 0 ? (
                <div>ノートがありません</div>
            ) : (
                <div className="p-2 border-t">
                    {notes.map((note, index) => (
                        <div key={note.noteId} className="p-4 border-b">
                            <p>{index + 1}</p>
                            <p className="font-bold">{note.fields.表面.value}</p>
                            <p className="text-sm">{note.fields.裏面.value}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}