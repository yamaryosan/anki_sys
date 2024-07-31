'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import UploadModal from "@/app/components/UploadModal";
import { createPortal } from "react-dom";

export default function Page() {
    const [text, setText] = useState<string>('');
    const [decks, setDecks] = useState<string[]>([]);
    const [selectedDeck, setSelectedDeck] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('ファイルを選択してください');
    const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

   useEffect(() => {
    setLoading(false);
}, []);

    // ファイル選択ダイアログを動的に生成してテキストファイルを選択
    const textfileHandler = (): void => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', '.txt');
        input.click();
        input.onchange = () => {
            const file = input.files?.item(0);
            if (!file) {
                return;
            }
            // ファイルを読み込んでテキストを取得
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                setText(reader.result as string);
            }
            setMessage(`ファイルを選択しました: ${file.name}`);
            setIsFileSelected(true);
        }
    }

    // モーダル表示
    const handleDialog = (): void => {
        setShow(!show);
    }

    return (
        <div>
            <h2>ノート追加</h2>
            <p>{message}</p>
            <button onClick={textfileHandler}>テキストファイルを選択</button>
            <button onClick={handleDialog} disabled={show || !isFileSelected}>アップロード</button>
            <div id="modal"></div>
            {show && isFileSelected && createPortal(
                <UploadModal 
                decks={decks}
                onDecksChange={setDecks}
                selectedDeck={selectedDeck}
                onSelectedDeckChange={setSelectedDeck}
                textUpload={text}
                handleDialog={handleDialog}
                />,
                document.getElementById('modal') as Element)}
            <Link href="/">ノート一覧</Link>
        </div>
    )
}