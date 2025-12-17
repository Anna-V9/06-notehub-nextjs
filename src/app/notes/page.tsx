import { QueryClient } from '@tanstack/react-query';
import { fetchNotes, NotesResponse } from '../../lib/api';
import Link from 'next/link';

export default async function NotesPage() {
  const queryClient = new QueryClient();

  const notesData = await queryClient.fetchQuery<NotesResponse>({
    queryKey: ['notes', { page: 1, perPage: 10 }], // pass your params here
    queryFn: ({ queryKey }) => {
      const [_key, params] = queryKey as [string, { page?: number; perPage?: number }];
      return fetchNotes(params);
    },
  });

  return (
    <div>
      <h1>All Notes</h1>
      <ul>
        {notesData.docs.map(note => (
          <li key={note.id}>
            <Link href={`/notes/${note.id}`}>{note.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}