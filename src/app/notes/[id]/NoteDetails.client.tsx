'use client';

import { useQuery, QueryClient, hydrate } from '@tanstack/react-query';
import type { DehydratedState } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import type { Note } from '../../../types/note';

interface Props {
  noteId: string;
  dehydratedState: DehydratedState;
}

export default function NoteDetailsClient({ noteId, dehydratedState }: Props) {
  const queryClient = new QueryClient();

  
  hydrate(queryClient, dehydratedState);

  const { data: note, isLoading, error } = useQuery<Note>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    initialData: () => queryClient.getQueryData(['note', noteId]),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !note) return <p>Error loading note</p>;

  return (
    <article>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      {note.tag && <span>Tag: {note.tag}</span>}
    </article>
  );
}