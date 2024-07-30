'use client';

import { getDecks } from "@/lib/api/deckApi";
import getNotes from "@/lib/api/noteApi";
import { useEffect, useState } from "react";

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
            <h1>テスト</h1>
            {/* デッキ選択 */}
            <select name="decks" id="decks" onChange={handleChange}>
                {decks.map((deck, index) => (
                    <option key={index} value={deck}>{deck}</option>
                ))}
            </select>
            <h2>ノート一覧</h2>
            {notes.length === 0 ? (
                <div>ノートがありません</div>
            ) : (
                <div>
                    {notes.map((note) => (
                        <div key={note.noteId}>
                            <p>{note.fields.表面.value}</p>
                            <p>{note.fields.裏面.value}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}