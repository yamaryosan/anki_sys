import { getDecks } from "@/lib/api/deckApi";
import { useEffect, useState } from "react";
import { addNotes } from "@/lib/api/noteApi";

type UploadModalProps = {
    decks: string[];

    onDecksChange: (decks: string[]) => void;
    selectedDeck: string;
    onSelectedDeckChange: (deck: string) => void;
    textUpload: string;
    handleDialog: () => void;
}

export default function UploadModal({decks, onDecksChange, selectedDeck, onSelectedDeckChange, textUpload, handleDialog}: UploadModalProps) {
    const [message, setMessage] = useState<string>('デッキを選択してください');
    const [loading, setLoading] = useState<boolean>(true);

   // デッキ一覧取得および初期デッキ設定
   useEffect(() => {
        async function fetchData() {
            const decks = await getDecks();
            onDecksChange(decks);
            onSelectedDeckChange(decks[0]);
        }
        fetchData();
        setLoading(false);
    }, []);

    // デッキから選択
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectedDeckChange(event.target.value);
    }

    // テキストファイルをアップロード
    const uploadHandler = (): void => {
        addNotes(textUpload, selectedDeck);
        setMessage('アップロードしました');
        handleDialog();
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 flex justify-center items-center">
            <button className="top-0 right-0 p-2" onClick={handleDialog}>閉じる</button>
            {/* デッキ選択 */}
            <div className="p-2">
                <select name="decks" id="decks" onChange={handleChange} className="p-2 border text-blue-600">
                    {decks.map((deck, index) => (
                        <option key={index} value={deck}>{deck}</option>
                    ))}
                </select>
            </div>
            <button className="p-2 border" onClick={() => uploadHandler()}>アップロード</button>
        </div>
    )

}