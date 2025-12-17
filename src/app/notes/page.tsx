import { QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '../../lib/api';
import Link from 'next/link';

export default async function NotesPage() {
  const queryClient = new QueryClient();

  const notesData = await queryClient.fetchQuery({
    queryKey: ['notes', 1],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 10,
        search: '',
      }),
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