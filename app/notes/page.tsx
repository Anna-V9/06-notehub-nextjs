import Link from 'next/link';
import { fetchNotes } from '../../lib/api';


export const dynamic = 'force-dynamic';

export default async function NotesPage() {
  const notesData = await fetchNotes({
    page: 1,
    perPage: 10,
    search: '',
  });

  return (
    <section>
      <h1>All Notes</h1>

      {notesData.docs.length === 0 ? (
        <p>No notes found</p>
      ) : (
        <ul>
          {notesData.docs.map(note => (
            <li key={note.id}>
              <Link href={`/notes/${note.id}`}>
                {note.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}