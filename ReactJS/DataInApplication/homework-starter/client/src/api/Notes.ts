import { useEffect, useState } from "react";
import { z } from "zod";
import { validateResponse } from "./validateResponse";

const NotesSchema = z.object({
    id: z.string(),
    title: z.string(),
    text: z.string(),
    userId: z.string(),
    createdAt: z.number(),
})

export type Note = z.infer<typeof NotesSchema>;

export const NoteList = z.array(NotesSchema);

export type NoteList = z.infer<typeof NoteList>

export const FetchNoteListSchema = z.object({
    list: NoteList,
})

type FetchNoteListResponse = z.infer<typeof FetchNoteListSchema>

export function fetchNoteList(): Promise<FetchNoteListResponse> {
    return fetch("/api/notes")
        .then((response) => response.json())
        .then((data) => FetchNoteListSchema.parse(data));
}

interface IdleRequestState {
    status: "idle";
}

interface LoadingRequestState {
    status: "pending";
}

interface SuccessRequestState {
    status: "success";
    data: NoteList;
}

interface ErrorRequestState {
    status: "error";
    error: unknown;
}

export function useNoteList() {
    const [state, setState] = useState<RequestState>({ status: "idle" });

    useEffect(() => {
        if (state.status === "pending") {
            fetchNoteList()
                .then((data) => {
                    setState({ status: "success", data: data.list })
                })
                .catch((error) => {
                    setState({ status: "error", error })
                })
        }
    }, [state])

    useEffect(() => {
        setState({status: "pending"});
    }, [])

    const refetch = () => {
        setState({status: "pending"});
    }

    return {
        state,
        refetch,
    };
}

type RequestState =
    | IdleRequestState
    | LoadingRequestState
    | SuccessRequestState
    | ErrorRequestState

//Функция создание заметки
export function createNote(
    title: string,
    text: string,
): Promise<void> {
    return fetch("/api/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, text, })
    })
        .then(validateResponse)
        .then(() => undefined)
}
