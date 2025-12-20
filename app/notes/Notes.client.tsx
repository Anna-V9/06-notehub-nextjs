'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../lib/api';

export default function NotesClient() {
  const { data, isLoading } = useQuery({
    queryKey: ['notes', { page: 1, perPage: 10, search: '' }],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 10,
        search: '',
      }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data || data.notes.length === 0) return <p>No notes found</p>;

  return (
    <section>
      <h1>All Notes</h1>

      <ul>
        {data.notes.map(note => (
          <li key={note.id}>
            <Link href={`/notes/${note.id}`}>
              {note.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}