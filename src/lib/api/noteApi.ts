import { NextRequest, NextResponse } from 'next/server';

type findNoteRes = {
    error: string | null;
    result: string[] | null;
}

type noteIds = string[];

type notesInfoRes = {
    error: string | null;
    result: note[] | null;
}

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

/**
 * デッキ名からノートIDを取得
 * @param deck デッキ名
 * @returns ノート一覧
 */
async function getNoteIDs(deck: string): Promise<string[]> {
    try {
        const action = "findNotes";
        const version = 6;
        const params = {
            query: `deck:${deck}`,
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({action, version, params}),
        });
        const data = await response.json() as findNoteRes;
        const notes = data.result as noteIds;
        if (notes === null) {
            throw new Error("ノート一覧の取得に失敗しました");
        }
        return notes;
    } catch (error) {
        console.error(error);
        return [];
    }
}

/**
 * ノートIDからノート情報を取得
 * @param noteIds ノートID
 * @returns ノート情報
 */
async function getNotesInfo(noteIds: string[]): Promise<note[]> {
    try {
        const action = "notesInfo";
        const version = 6;
        const params = {
            notes: noteIds,
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({action, version, params}),
        });
        const data = await response.json() as notesInfoRes;
        if (data.error !== null) {
            throw new Error("ノート情報の取得に失敗しました");
        }
        const notes = data.result as note[];
        return notes;
    } catch (error) {
        console.error(error);
        return [];
    }
}

/**
 * デッキ名からノート情報を取得
 * @param deck デッキ名
 * @returns ノート情報
 */
export async function getNotes(deck: string): Promise<note[]> {
    const noteIds = await getNoteIDs(deck);
    const notes = await getNotesInfo(noteIds);
    console.log(notes);
    return notes as note[];
}

/**
 * テキストを受け取りデッキに追加
 * @param text テキスト
 */
export async function addNotes(text: string): Promise<void> {
    console.log(text);
}