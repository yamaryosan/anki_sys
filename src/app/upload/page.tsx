'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { addNotes } from "@/lib/api/noteApi";

export default function Page() {
    const [text, setText] = useState<string>('');
    const [message, setMessage] = useState<string>('ファイルを選択してください');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(false);
    });

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
        }
    }

    // テキストファイルをアップロード
    const uploadHandler = (): void => {
        if (text === '') {
            setMessage('空のファイルです');
            return;
        }
        addNotes(text);
        setMessage('アップロードしました');
    }

    return (
        <div>
            <h2>ノート追加</h2>
            <p>{message}</p>
            <button onClick={textfileHandler}>テキストファイルを選択</button>
            <button onClick={uploadHandler}>アップロード</button>
            <Link href="/">ノート一覧</Link>
        </div>
    )
}