import "./NotesListView.css";
import { NoteView } from "../NoteView";
import { Note, NoteList } from "../../api/Notes";
import { FC } from "react";

export interface NoteListViewProps {
  noteList: NoteList;
}

export const NotesListView: FC<NoteListViewProps> = ({ noteList }) => {
  return (
    <ul className="note-list-view">
      {noteList.map((note: Note) => (
        <li key={note.id} className="post-list__item">
          <NoteView note={note} />
        </li>
      ))}
    </ul>
  );
};
