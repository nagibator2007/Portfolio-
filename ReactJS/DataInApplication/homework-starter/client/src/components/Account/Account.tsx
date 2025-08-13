import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { fetchMe } from "../../api/User";
import { Loader } from "../Loader";
import { AuthForm } from "../AuthForm";
import { NoteForm } from "../NoteForm";
import { FetchNoteListView } from "../NotesListView/FetchNoteListView";
import  "./Note.css";
import { LogoutButton } from "../LogoutButton";

export const Account = () => {
    const meQuery = useQuery({
        queryFn: () => fetchMe(),
        queryKey: ["users", "me"],
    }, queryClient);

    switch (meQuery.status) {
        case "pending":
            return <Loader />;

        case "error":
            return <AuthForm />;

        case "success":

            return (
                <div className="note">
                    <NoteForm />
                    <FetchNoteListView />
                    <LogoutButton/>
                </div>
            );

    }
}